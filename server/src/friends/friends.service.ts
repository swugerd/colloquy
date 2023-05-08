import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Friends } from './models/friends.model';
import { User } from 'src/users/models/users.model';
import { FriendsRequests } from './models/friend-requests.model';
import { Op } from 'sequelize';
import { FriendDto } from './dto/friend.dto';
import { FriendReqDto } from './dto/friend-req.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends) private readonly friendsRepository: typeof Friends,
    @InjectModel(FriendsRequests)
    private readonly friendsRequestsRepository: typeof FriendsRequests,
    @InjectModel(User) private readonly usersRepository: typeof User,
  ) {}

  async getFriendsById(user1_id: number, user2_id?: number) {
    const friends = await this.friendsRepository.findAll({
      where: {
        [Op.or]: user2_id
          ? [
              { user1_id, user2_id },
              { user1_id: user2_id, user2_id: user1_id },
            ]
          : { user1_id, user2_id: user1_id },
      },
      include: { all: true },
    });
    return friends;
  }

  async getFriendsByFilter(filterType: string, userId: number) {
    const friends =
      filterType === 'online'
        ? await this.friendsRepository.findAll({
            where: { [Op.or]: { user1_id: userId, user2_id: userId } },
            include: [
              {
                model: this.usersRepository,
                where: { online_type: { [Op.not]: 'pc-offline' } },
                as: 'user',
                required: false,
              },
              {
                model: this.usersRepository,
                where: { online_type: { [Op.not]: 'pc-offline' } },
                as: 'friend',
                required: false,
              },
            ],
          })
        : await this.friendsRequestsRepository.findAll({
            where: {
              [`${filterType === 'income' ? 'user_income_id' : 'user_outcome_id'}`]: userId,
            },
            include: { all: true },
          });

    return friends;
  }

  async createReqById({ user_income_id }: FriendReqDto, user_outcome_id: number) {
    const createdReq = await this.friendsRequestsRepository.create({
      user_outcome_id,
      user_income_id,
    });
    return createdReq;
  }

  async removeReqById({ user_income_id }: FriendReqDto, user_outcome_id: number) {
    const deletedReq = await this.friendsRequestsRepository.findOne({
      where: {
        [Op.or]: [
          { user_income_id, user_outcome_id },
          { user_income_id: user_outcome_id, user_outcome_id: user_income_id },
        ],
      },
      include: { all: true },
    });
    return deletedReq ? deletedReq.destroy() : '';
  }

  async addFriendById({ user2_id }: FriendDto, user1_id: number) {
    const deletedReq = this.removeReqById({ user_income_id: user2_id }, user1_id);

    const createdFriendship = await this.friendsRepository.create({ user1_id, user2_id });

    return createdFriendship;
  }

  async deleteFriendById({ user2_id }: FriendDto, user1_id: number) {
    const deletedFriendship = await this.friendsRepository.findOne({
      where: {
        [Op.or]: [
          { user1_id, user2_id },
          { user1_id: user2_id, user2_id: user1_id },
        ],
      },
      include: { all: true },
    });
    return deletedFriendship ? deletedFriendship.destroy() : '';
  }

  async getReqsById(user_outcome_id: number, user_income_id: number) {
    const req = this.friendsRequestsRepository.findOne({
      where: {
        [Op.or]: [
          { user_income_id, user_outcome_id },
          { user_income_id: user_outcome_id, user_outcome_id: user_income_id },
        ],
      },
    });
    return req;
  }
}
