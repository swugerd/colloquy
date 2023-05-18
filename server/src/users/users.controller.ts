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
  Delete,
  Query,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserQueryParams } from './validators/user-query.validator';
import { BlacklistDto } from 'src/groups/dto/blacklist.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('/filter')
  filter(
    @Query('userId') userId: number,
    @Query('groupId') groupId: number,
    @Query('q') q?: string,
    @Query('city') city?: number,
    @Query('ageFrom') ageFrom?: number,
    @Query('ageTo') ageTo?: number,
    @Query('maleGender') maleGender?: string,
    @Query('femaleGender') femaleGender?: string,
    @Query('online') online?: boolean,
  ) {
    const query: UserQueryParams = {
      userId,
      q,
      city,
      ageFrom,
      ageTo,
      maleGender,
      femaleGender,
      online,
      groupId,
    };
    return this.userService.filterUsers(query);
  }

  @Get('/:id')
  getAllWithoutMe(@Param('id') id: number) {
    return this.userService.getAllUsersWithoutMe(id);
  }

  @Get('/getById/:id')
  getById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Get('/getByNickname/:nickname')
  getByNickname(@Param('nickname') nickname: string) {
    return this.userService.getUserByNickname(nickname);
  }

  @Get('/blacklist/:id')
  getUsersFromBlacklist(@Param('id') userId: number) {
    return this.userService.getUsersFromBlacklist(userId);
  }

  @Post('/blacklist/:id')
  addUserToBlacklist(@Param('id') userId: number, @Body() dto: BlacklistDto) {
    return this.userService.addUserToBlacklist(userId, dto);
  }

  @Delete('/blacklist/:id')
  removeUserFromBlacklist(@Param('id') userId: number, @Body() dto: BlacklistDto) {
    return this.userService.removeUserFromBlacklist(userId, dto);
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

  @Delete('/:id')
  deleteById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
