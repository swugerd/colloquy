import { FilesService } from './../files/files.service';
import { User } from './../users/models/users.model';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly filesService: FilesService,
  ) {}

  async login(userDto: UserLoginDto) {
    const user = await this.validateUser(userDto, 'login');
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto, image: any) {
    const candidate = await this.userService.getUserByEmailOrLogin(
      'registration',
      userDto.user_email,
      userDto.user_nickname,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email или логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordHash = await bcrypt.hash(userDto.user_password, 5);
    const fileName = await this.filesService.createFile(image);
    const user = await this.userService.createUser({
      ...userDto,
      user_password: passwordHash,
      user_avatar: fileName,
    });
    return this.generateToken(user);
  }

  async validateUser(userDto: UserLoginDto, type: 'login' | 'registration') {
    const user = await this.userService.getUserByEmailOrLogin(type, userDto.emailOrLogin);
    if (!user) throw new UnauthorizedException({ message: 'Пользователь не найден' });
    const passwordEquals = await bcrypt.compare(userDto.user_password, user.user_password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неверный пароль' });
  }

  async generateToken({ id, user_email, roles }: User) {
    const payload = { email: user_email, id, roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
