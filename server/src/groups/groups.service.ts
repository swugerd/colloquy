import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { GroupMember } from './models/group-members.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { FilesService, UploadedFile } from '../files/files.service';
import { Op, Sequelize } from 'sequelize';
import { User } from 'src/users/models/users.model';
import { GroupQueryParams } from './validators/group-query.validator';
import { UpdateGroupDto } from './dto/update-group.dto';
import { BlacklistDto } from './dto/blacklist.dto';
import { Blacklist } from './models/blacklist.model';
import { GroupRequestDto } from './dto/group-req.dto';
import { GroupRequest } from './models/group-requests.model';
import { CreateSuggestDto } from './dto/create-suggest.dto';
import { GroupSuggest } from './models/group-suggest.model';
import { PostsService } from 'src/posts/posts.service';
import { Photo } from 'src/photos/models/photos.model';
import { Video } from 'src/videos/models/video.model';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private readonly groupsRepository: typeof Group,
    @InjectModel(Blacklist) private readonly blacklistRepository: typeof Blacklist,
    @InjectModel(GroupMember) private readonly groupsMembersRepository: typeof GroupMember,
    @InjectModel(GroupRequest) private readonly groupsRequestsRepository: typeof GroupRequest,
    @InjectModel(GroupSuggest) private readonly groupSuggestRepository: typeof GroupSuggest,
    private readonly filesService: FilesService,
    private readonly postsService: PostsService,
  ) {}

  async createGroup(dto: CreateGroupDto, image: UploadedFile) {
    const candidate = await this.groupsRepository.findOne({
      where: { [Op.or]: { group_adress: dto.group_adress, group_name: dto.group_name } },
    });

    if (candidate) {
      throw new HttpException(
        'Группа с таким названием или адресом уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const key in dto) {
      if (dto[key] === '') {
        dto[key] = null;
      }
    }

    const fileName = await this.filesService.createFile(image);

    const createdGroup = await this.groupsRepository.create({ ...dto, group_avatar: fileName });

    const insertedMember = await this.groupsMembersRepository.create({
      group_id: createdGroup.id,
      user_id: dto.creator_id,
      is_admin: true,
    });

    return createdGroup;
  }

  async getAllGroupsByUserId(id: number) {
    const groups = await this.groupsMembersRepository.findAll({
      where: { user_id: id },
      include: {
        model: Group,
        include: [
          {
            model: GroupMember,
          },
        ],
      },
    });

    return groups;
  }

  async getAllMembers(id: number) {
    const members = await this.groupsMembersRepository.findAll({
      where: { group_id: id },
      include: { model: User },
    });

    return members;
  }

  async filterGroups(query: GroupQueryParams) {
    const { userId, membersFrom, membersTo, city, thematic, q, filterType, isPrivate } = query;

    const groupsIds = (
      await this.groupsMembersRepository.findAll({
        where: { user_id: userId },
      })
    ).map((item) => item.group_id);

    const blacklistedGroupsIds = (
      await this.blacklistRepository.findAll({
        where: { blocked_user_id: userId },
      })
    ).map((item) => item.group_id);

    const privateGroupsIds = (
      await this.groupsRequestsRepository.findAll({
        where: { user_id: userId },
      })
    ).map((item) => item.group_id);

    const where = {
      ...((groupsIds.length || blacklistedGroupsIds.length || privateGroupsIds.length) &&
      filterType !== 'created'
        ? { [Op.not]: { id: [...groupsIds, ...blacklistedGroupsIds, ...privateGroupsIds] } }
        : {}),
      ...(q
        ? {
            [Op.or]: [
              { group_name: { [Op.like]: `%${q}%` } },
              { group_adress: { [Op.like]: `%${q}%` } },
            ],
          }
        : {}),
      ...(city ? { city_id: city } : {}),
      ...(thematic ? { thematic_id: thematic } : {}),
      ...(membersFrom
        ? {
            [Op.and]: Sequelize.literal(`(
                SELECT COUNT(*)
                FROM group_members
                WHERE group_id = "Group".id
              ) >= ${membersFrom}`),
          }
        : {}),
      ...(membersTo
        ? {
            [Op.and]: Sequelize.literal(`(
                SELECT COUNT(*)
                FROM group_members
                WHERE group_id = "Group".id
              ) <= ${membersTo}`),
          }
        : {}),
      ...(isPrivate ? { is_private: true } : {}),
      ...(filterType === 'created' ? { creator_id: userId } : {}),
    };

    const groups = await this.groupsRepository.findAll({
      where,
      include: {
        model: Group,
        include: [
          {
            model: GroupMember,
          },
        ],
      },
    });

    return groups;
  }

  async getGroupByAdress(group_adress: string) {
    const group = await this.groupsRepository.findOne({
      where: { group_adress },
      include: [
        {
          model: GroupMember,
          as: 'members',
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        },
        {
          model: Photo,
          as: 'photos',
        },
        { model: Video, as: 'videos' },
        { model: GroupRequest, as: 'requests' },
        { model: Blacklist, as: 'blacklistedUsers' },
      ],
    });
    return group;
  }

  async updateGroup(id: number, dto: UpdateGroupDto, image?: UploadedFile) {
    const group = await this.groupsRepository.findByPk(id, { include: { all: true } });

    if (dto.group_adress) {
      const candidate = await this.groupsRepository.findOne({
        where: {
          [Op.and]: {
            [Op.or]: [
              {
                group_adress: dto.group_adress,
              },
            ],
            id: {
              [Op.not]: id,
            },
          },
        },
      });
      if (candidate) {
        throw new HttpException('Группа с таким адресом уже существует', HttpStatus.BAD_REQUEST);
      }
    }

    for (const key in dto) {
      if (dto[key] === '') {
        dto[key] = null;
      }
    }

    return group.update({
      ...dto,
      group_avatar: image
        ? await this.filesService.createFile(image, 0, false, group.id)
        : group.group_avatar,
    });
  }

  async getUsersFromBlacklist(group_id: number) {
    const users = await this.blacklistRepository.findAll({
      where: {
        group_id,
      },
      include: { model: User },
    });
    return users;
  }

  async addUserToBlacklist(group_id: number, { blocked_user_id }: BlacklistDto) {
    const addedUser = await this.blacklistRepository.create({
      group_id,
      blocked_user_id,
    });

    const deletedMember = await this.groupsMembersRepository.destroy({
      where: {
        [Op.and]: {
          user_id: blocked_user_id,
          group_id,
        },
      },
    });

    return addedUser;
  }

  async removeUserFromBlacklist(group_id: number, { blocked_user_id }: BlacklistDto) {
    const deletedBlacklistedUser = await this.blacklistRepository.destroy({
      where: {
        [Op.and]: {
          group_id,
          blocked_user_id,
        },
      },
    });
    return deletedBlacklistedUser;
  }

  async getAllSuggest(group_id: number) {
    const suggest = await this.groupSuggestRepository.findAll({
      where: { group_id },
      include: { model: User },
    });
    return suggest;
  }

  async createSuggest(user_id: number, dto: CreateSuggestDto) {
    const createdSuggest = await this.groupSuggestRepository.create({ user_id, ...dto });
    return createdSuggest;
  }

  async deleteSuggest(suggest_id: number, type: 'approve' | 'reject') {
    const suggest = await this.groupSuggestRepository.findByPk(suggest_id);

    if (type === 'approve') {
      const postDto = {
        user_id: suggest.user_id,
        group_id: suggest.group_id,
        is_anonym: suggest.is_anonym,
        post_text: suggest.suggest_text,
      };

      await this.postsService.createPost(undefined, postDto);
    }

    const deletedSuggest = suggest?.destroy();

    return deletedSuggest;
  }

  async joinGroup(user_id: number, { group_id }: GroupRequestDto) {
    const insertedMember = await this.groupsMembersRepository.create({
      group_id,
      user_id,
      is_admin: false,
    });

    const groups = await this.filterGroups({ userId: user_id });

    return groups;
  }

  async quitGroup(user_id: number, { group_id }: GroupRequestDto) {
    const quitedUser = await this.groupsMembersRepository?.destroy({
      where: { user_id, group_id },
    });
    return quitedUser;
  }

  async getReqs(group_id: number) {
    const reqs = await this.groupsRequestsRepository.findAll({
      where: { group_id },
      include: { model: User },
    });
    return reqs;
  }

  async createReq(user_id: number, { group_id }: GroupRequestDto) {
    const createdReq = await this.groupsRequestsRepository.create({
      user_id,
      group_id,
    });
    return createdReq;
  }

  async deleteReq(user_id: number, { group_id }: GroupRequestDto, type: 'approve' | 'reject') {
    const deletedReq = await this.groupsRequestsRepository.findOne({
      where: {
        [Op.and]: { user_id, group_id },
      },
    });

    const insertedMember =
      type === 'approve'
        ? await this.groupsMembersRepository.create({
            group_id,
            user_id,
            is_admin: false,
          })
        : '';

    return deletedReq ? deletedReq.destroy() : '';
  }

  async getMods(group_id: number, user_id: string) {
    const moderators = await this.groupsMembersRepository.findAll({
      where: { group_id, is_admin: true, [Op.not]: { user_id } },
      include: { model: User },
    });
    return moderators;
  }

  async handleModsRules(
    group_id: number,
    { user_id }: { user_id: number },
    action: 'add' | 'remove',
  ) {
    const updatedMember = await this.groupsMembersRepository.update(
      { is_admin: action === 'add' ? true : false },
      { where: { user_id, group_id } },
    );
    return updatedMember;
  }

  async deleteGroup(id: number) {
    const group = await this.groupsRepository.findOne({
      where: { id },
    });

    group && (await this.filesService.deleteFile(group.group_avatar));

    return group?.destroy();
  }
}
