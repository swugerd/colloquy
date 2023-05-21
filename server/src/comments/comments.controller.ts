import { Body, Controller, Delete, Get, Param, Post, Query, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import CommentDto from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsSerive: CommentsService) {}

  @Post('/:id')
  createLikeById(@Param('id') userId: number, @Body() dto: CommentDto) {
    return this.commentsSerive.createComment(userId, dto);
  }

  @Put('/:id')
  updateCommentById(
    @Param('id') userId: number,
    @Body() dto: { id: number; comment_text: string },
  ) {
    return this.commentsSerive.updateComment(userId, dto);
  }

  @Delete('/:id')
  deleteLikeById(@Param('id') id: number) {
    return this.commentsSerive.deleteComment(id);
  }

  @Get('/:id')
  getLikesById(@Param('id') id: number, @Query('type') type: 'post') {
    return this.commentsSerive.getComments(id, type);
  }
}
