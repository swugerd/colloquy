import { User } from './../users/models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesService } from './files.service';
import { Module } from '@nestjs/common';
import { Group } from 'src/groups/models/group.model';

@Module({
  providers: [FilesService],
  imports: [SequelizeModule.forFeature([User, Group])],
  exports: [FilesService],
})
export class FilesModule {}
