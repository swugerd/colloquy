import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [],
})
export class GroupsModule {}
