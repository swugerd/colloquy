import { FriendsService } from './../friends/friends.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/models/users.model';
import { Like } from 'src/likes/models/like.model';
import { Comment } from 'src/comments/models/comment.model';
import { Group } from 'src/groups/models/group.model';
import { UsersService } from 'src/users/users.service';
import { Op } from 'sequelize';
import { GroupsService } from 'src/groups/groups.service';
import { Response } from 'express';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private readonly postsRepository: typeof Post,
    private readonly friendsService: FriendsService,
    private readonly usersService: UsersService,
  ) {}

  async createPost(userId: number | undefined, dto: CreatePostDto) {
    const createdPost = await this.postsRepository.create({ user_id: userId, ...dto });
    const post = await this.getPost(createdPost.id);
    return post;
  }

  async getPost(id: number) {
    const post = await this.postsRepository.findByPk(id, {
      include: [
        { model: User, as: 'postCreator' },
        { model: User, as: 'userReferer' },
        { model: Like, as: 'likes' },
        { model: Group, as: 'group' },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: Like, as: 'likes', include: [User] }, { model: User }],
        },
      ],
    });

    return post;
  }

  async getPosts(id: number, type: 'user' | 'user_referer' | 'group', page: number, limit: number) {
    const offset = (page - 1) * limit;

    const totalCount = await this.postsRepository.count({
      where: { [`${type}_id`]: id },
    });

    const posts = await this.postsRepository.findAll({
      where: { [`${type}_id`]: id },
      include: [
        { model: User, as: 'postCreator' },
        { model: User, as: 'userReferer' },
        { model: Like, as: 'likes' },
        { model: Group, as: 'group' },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: Like, as: 'likes', include: [User] }],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return {
      posts,
      totalCount,
    };
  }

  async getFeed(id: number, page: number, limit: number) {
    const friends = await this.friendsService.getFriendsById(id);
    const user = await this.usersService.getUserById(id);

    const groupIds = user.groups.map((group) => group.group_id);
    const friendIds = friends.map((friend) => {
      if (friend.user1_id === Number(id)) {
        return friend.user2_id;
      } else if (friend.user2_id === Number(id)) {
        return friend.user1_id;
      }
      return;
    });

    const offset = (page - 1) * limit;

    const totalCount = await this.postsRepository.count({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { user_id: { [Op.in]: friendIds } },
              { user_referer_id: { [Op.in]: friendIds } },
              { user_id: { [Op.col]: 'user_referer_id' } },
            ],
          },
          { group_id: { [Op.in]: groupIds } },
        ],
      },
    });

    const posts = await this.postsRepository.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { user_id: { [Op.in]: friendIds } },
              { user_referer_id: { [Op.in]: friendIds } },
              { user_id: { [Op.col]: 'user_referer_id' } },
            ],
          },
          { group_id: { [Op.in]: groupIds } },
        ],
      },
      include: [
        { model: User, as: 'postCreator' },
        { model: User, as: 'userReferer' },
        { model: Like, as: 'likes' },
        { model: Group, as: 'group' },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: Like, as: 'likes', include: [User] }],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return {
      posts,
      totalCount,
    };
  }

  async updatePost(id: number, dto: { post_text: string }) {
    const post = await this.postsRepository.findOne({ where: { id } });
    const updatedPost = post.update(dto);
    return updatedPost;
  }

  async deletePost(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    const deletedPost = post?.destroy();
    return post;
  }
}
