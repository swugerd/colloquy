import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private readonly postsRepository: typeof Post) {}

  async createPost(userId: number | undefined, dto: CreatePostDto) {
    const createdPost = await this.postsRepository.create(dto);
    return createdPost;
  }
}
