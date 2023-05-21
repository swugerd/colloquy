import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import CommentDto from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private readonly commentsRepository: typeof Comment) {}

  async createComment(userId: number, dto: CommentDto) {
    const createdComment = await this.commentsRepository.create({ user_id: userId, ...dto });
    return createdComment;
  }

  async updateComment(id: number, dto: { id: number; comment_text: string }) {
    const comment = await this.commentsRepository.findByPk(id);

    const updatedComment = comment.update({ comment_text: dto.comment_text });

    return updatedComment;
  }

  async deleteComment(id: number) {
    const comment = await this.commentsRepository.findByPk(id);
    return comment?.destroy();
  }

  async getComments(id: number, type: 'post') {
    const comments = await this.commentsRepository.findAll({ where: { [`${type}_id`]: id } });
    return comments;
  }
}
