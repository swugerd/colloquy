import { Body, Controller, Delete, Param, Post, Get, Query } from '@nestjs/common';
import { LikesService } from './likes.service';
import LikeDto from './dto/like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/:id')
  createLikeById(@Param('id') userId: number, @Body() dto: LikeDto) {
    return this.likesService.createLike(userId, dto);
  }

  @Delete('/:id')
  deleteLikeById(@Param('id') id: number) {
    return this.likesService.deleteLike(id);
  }

  @Get('/:id')
  getLikesById(@Param('id') id: number, @Query('type') type: 'post' | 'comment') {
    return this.likesService.getLikes(id, type);
  }
}
