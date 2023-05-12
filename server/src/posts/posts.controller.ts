import { Controller, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsSrvice: PostsService) {}
  @Post('/create/:id')
  createPostById(@Param('id') userId: number, dto: CreatePostDto) {
    return this.postsSrvice.createPost(userId, dto);
  }
}
