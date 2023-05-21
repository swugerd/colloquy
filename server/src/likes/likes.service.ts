import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './models/like.model';
import LikeDto from './dto/like.dto';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private readonly likesRepository: typeof Like) {}

  async createLike(userId: number, dto: LikeDto) {
    const createdLike = await this.likesRepository.create({ user_id: userId, ...dto });
    return createdLike;
  }

  async deleteLike(id: number) {
    const like = await this.likesRepository.findOne({ where: { id } });
    return like?.destroy();
  }

  async getLikes(id: number, type: 'post' | 'comment') {
    const likes = await this.likesRepository.findAll({ where: { [`${type}_id`]: id } });
    return likes;
  }
}
