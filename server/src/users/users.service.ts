import { FilesService } from './../files/files.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Op } from 'sequelize';
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
    return user.update({
      ...dto,
      user_avatar: image ? await this.fileService.createFile(image, user.id) : user.user_avatar,
    });
  }
}
