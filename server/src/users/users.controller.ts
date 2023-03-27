import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UploadedFile as UploadedFileType } from '../files/files.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('/getById/:id')
  getById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Get('/getByNickname/:nickname')
  getByNickname(@Param('nickname') nickname: string) {
    return this.userService.getUserByNickname(nickname);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('user_avatar'))
  updateById(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() image?: UploadedFileType,
  ) {
    return this.userService.updateUserById(id, dto, image);
  }
}
