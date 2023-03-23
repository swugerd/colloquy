import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UploadedFile as FileToUpload } from '../files/files.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/registration')
  @UseInterceptors(FileInterceptor('user_avatar'))
  registraion(@Body() userDto: CreateUserDto, @UploadedFile() image: FileToUpload) {
    return this.authService.registration(userDto, image);
  }
  @Post('/login')
  login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto);
  }
  @Post('/refreshToken')
  refresh(@Body() token: RefreshTokenDto) {
    return this.authService.refreshToken(token);
  }
  @Post('/logout')
  logout(@Headers('authorization') authHeader: string) {
    return this.authService.removeToken(authHeader);
  }
}
