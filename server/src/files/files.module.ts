import { User } from './../users/models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesService } from './files.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [FilesService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [FilesService],
})
export class FilesModule {}
