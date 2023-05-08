import { FriendReqDto } from './dto/friend-req.dto';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendDto } from './dto/friend.dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsSrvice: FriendsService) {}

  @Get('/filter')
  getByType(@Query('filterType') filterType: string, @Query('userId') userId: number) {
    return this.friendsSrvice.getFriendsByFilter(filterType, userId);
  }

  @Post('/:id')
  addById(@Body() dto: FriendDto, @Param('id') userId: number) {
    return this.friendsSrvice.addFriendById(dto, userId);
  }

  @Delete('/:id')
  deleteById(@Body() dto: FriendDto, @Param('id') userId: number) {
    return this.friendsSrvice.deleteFriendById(dto, userId);
  }

  @Post('/req/:id')
  createReqById(@Body() dto: FriendReqDto, @Param('id') userId: number) {
    return this.friendsSrvice.createReqById(dto, userId);
  }

  @Delete('/req/:id')
  removeReqById(@Body() dto: FriendReqDto, @Param('id') userId: number) {
    return this.friendsSrvice.removeReqById(dto, userId);
  }

  @Get('/req/:id')
  getReqsById(@Param('id') id: number, @Query('userId') userId: number) {
    return this.friendsSrvice.getReqsById(id, userId);
  }

  @Get('/:id')
  getById(@Param('id') id: number, @Query('userId') userId: number) {
    return this.friendsSrvice.getFriendsById(id, userId);
  }
}
