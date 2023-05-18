import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile as FileToUpload } from '../files/files.service';
import { GroupQueryParams } from './validators/group-query.validator';
import { UpdateGroupDto } from './dto/update-group.dto';
import { BlacklistDto } from './dto/blacklist.dto';
import { GroupRequestDto } from './dto/group-req.dto';
import { CreateSuggestDto } from './dto/create-suggest.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('group_avatar'))
  createGroup(@Body() dto: CreateGroupDto, @UploadedFile() image: FileToUpload) {
    return this.groupsService.createGroup(dto, image);
  }

  @Get('/filter')
  filterGroups(
    @Query('userId') userId: number,
    @Query('q') q?: string,
    @Query('city') city?: number,
    @Query('thematic') thematic?: number,
    @Query('membersFrom') membersFrom?: number,
    @Query('membersTo') membersTo?: number,
    @Query('filterType') filterType?: string,
    @Query('isPrivate') isPrivate?: boolean,
  ) {
    const query: GroupQueryParams = {
      userId,
      q,
      city,
      thematic,
      membersFrom,
      membersTo,
      filterType,
      isPrivate,
    };
    return this.groupsService.filterGroups(query);
  }

  @Get('/:id')
  getAllGroupsByUserId(@Param('id') userId: number) {
    return this.groupsService.getAllGroupsByUserId(userId);
  }

  @Get('/getByAdress/:adress')
  getGroupByAdress(@Param('adress') adress: string) {
    return this.groupsService.getGroupByAdress(adress);
  }

  @Get('/members/:id')
  getAllGroupMembers(@Param('id') groupId: number) {
    return this.groupsService.getAllMembers(groupId);
  }

  @Get('/blacklist/:id')
  getUsersFromBlacklist(@Param('id') groupId: number) {
    return this.groupsService.getUsersFromBlacklist(groupId);
  }

  @Post('/blacklist/:id')
  addUserToBlacklist(@Param('id') groupId: number, @Body() dto: BlacklistDto) {
    return this.groupsService.addUserToBlacklist(groupId, dto);
  }

  @Delete('/blacklist/:id')
  removeUserFromBlacklist(@Param('id') groupId: number, @Body() dto: BlacklistDto) {
    return this.groupsService.removeUserFromBlacklist(groupId, dto);
  }

  @Get('/suggest/:id')
  getSuggestsByGroupId(@Param('id') groupId: number) {
    return this.groupsService.getAllSuggest(groupId);
  }

  @Post('/suggest/:id')
  createSuggestByUserId(@Param('id') userId: number, @Body() dto: CreateSuggestDto) {
    return this.groupsService.createSuggest(userId, dto);
  }

  @Delete('/suggest/:id')
  deleteSuggestByUserId(@Param('id') suggestId: number, @Query('type') type: 'approve' | 'reject') {
    return this.groupsService.deleteSuggest(suggestId, type);
  }

  @Post('/join/:id')
  joinGroupByUserId(@Param('id') userId: number, @Body() dto: GroupRequestDto) {
    return this.groupsService.joinGroup(userId, dto);
  }

  @Delete('/exit/:id')
  quitFromGroupByUserId(@Param('id') userId: number, @Body() dto: GroupRequestDto) {
    return this.groupsService.quitGroup(userId, dto);
  }

  @Get('/req/:id')
  getAllRequestsByGroupId(@Param('id') groupId: number) {
    return this.groupsService.getReqs(groupId);
  }

  @Post('/req/:id')
  createRequestByUserId(@Param('id') userId: number, @Body() dto: GroupRequestDto) {
    return this.groupsService.createReq(userId, dto);
  }

  @Delete('/req/:id')
  deleteRequestByUserId(
    @Param('id') userId: number,
    @Body() dto: GroupRequestDto,
    @Query('type') type: 'approve' | 'reject',
  ) {
    return this.groupsService.deleteReq(userId, dto, type);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('group_avatar'))
  updateGroupById(
    @Param('id') groupId: number,
    @Body() dto: UpdateGroupDto,
    @UploadedFile() image: FileToUpload,
  ) {
    return this.groupsService.updateGroup(groupId, dto, image);
  }

  @Get('/mods/:id')
  getAllGroupModerators(@Param('id') group_id: number, @Query('userId') admin_id: string) {
    return this.groupsService.getMods(group_id, admin_id);
  }

  @Put('/mods/:id')
  updateModeratorRules(
    @Param('id') group_id: number,
    @Body() user_id: { user_id: number },
    @Query('action') action: 'add' | 'remove',
  ) {
    return this.groupsService.handleModsRules(group_id, user_id, action);
  }

  @Delete('/:id')
  deleteGroupById(@Param('id') groupId: number) {
    return this.groupsService.deleteGroup(groupId);
  }
}
