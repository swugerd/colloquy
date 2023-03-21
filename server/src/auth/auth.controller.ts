import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/registration')
  @UseInterceptors(FileInterceptor('user_avatar'))
  registraion(@Body() userDto: CreateUserDto, @UploadedFile() image: any) {
    return this.authService.registration(userDto, image);
  }
  @Post('/login')
  login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto);
  }
}
