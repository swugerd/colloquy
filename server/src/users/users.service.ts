import { FilesService } from './../files/files.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Op, where } from 'sequelize';
import { UploadedFile } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RolesService,
    private readonly fileService: FilesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('user');

    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUserByEmailOrLogin(type: 'login' | 'registration', ...rest: string[]) {
    const [email, login] = rest;
    const emailOrLogin = type === 'login' && rest[0];
    const user = await this.userRepository.findOne({
      where: {
        [Op.or]:
          type === 'login'
            ? { user_email: emailOrLogin, user_nickname: emailOrLogin }
            : { user_email: email, user_nickname: login },
      },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, { include: { all: true } });
    return user;
  }

  async getUserByNickname(nickname: string) {
    const user = await this.userRepository.findOne({
      where: { user_nickname: nickname },
      include: { all: true },
    });
    return user;
  }

  async updateUserById(id: number, dto: UpdateUserDto, image?: UploadedFile) {
    const user = await this.userRepository.findByPk(id, { include: { all: true } });

    for (const key in dto) {
      if (dto[key] === '') {
        dto[key] = null;
      }

      if (key === 'user_phone' || key === 'user_sub_phone') {
        if (dto[key] !== null) {
          dto[key] = dto[key].replace(/\D/g, '');
          if (dto[key].length !== 11 || dto[key][0] !== '7') {
            throw new HttpException(
              'Неверный формат телефона +7 (777) 777 77-77',
              HttpStatus.BAD_REQUEST,
            );
          }
          continue;
        }
      }
    }

    return user.update({
      ...dto,
      user_avatar: image ? await this.fileService.createFile(image, user.id) : user.user_avatar,
    });
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.findByPk(id, { include: { all: true } });

    await this.fileService.deleteFile(user.user_avatar);

    return user.destroy();
  }
}
