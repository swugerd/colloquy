import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Post, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
