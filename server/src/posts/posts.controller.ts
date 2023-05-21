import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsSrvice: PostsService) {}
  @Post('/create/:id')
  createPostById(@Param('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postsSrvice.createPost(userId, dto);
  }

  @Get('/:id')
  getPostsById(
    @Param('id') id: number,
    @Query('type') type: 'user' | 'user_referer' | 'group',
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.postsSrvice.getPosts(id, type, page, limit);
  }

  @Get('/feed/:id')
  getFeedPosts(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.postsSrvice.getFeed(id, page, limit);
  }

  @Get('/single/:id')
  getPostById(@Param('id') id: number) {
    return this.postsSrvice.getPost(id);
  }

  @Put('/:id')
  updatePostById(@Param('id') id: number, @Body() dto: { post_text: string }) {
    return this.postsSrvice.updatePost(id, dto);
  }

  @Delete('/:id')
  deletePostById(@Param('id') id: number) {
    return this.postsSrvice.deletePost(id);
  }
}
