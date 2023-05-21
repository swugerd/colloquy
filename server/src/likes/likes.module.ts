import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './models/like.model';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [SequelizeModule.forFeature([Like])],
})
export class LikesModule {}
