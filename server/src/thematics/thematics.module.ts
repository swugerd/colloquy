import { Module } from '@nestjs/common';
import { ThematicsService } from './thematics.service';
import { ThematicsController } from './thematics.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Thematic } from './models/thematics.model';

@Module({
  providers: [ThematicsService],
  controllers: [ThematicsController],
  imports: [SequelizeModule.forFeature([Thematic])],
})
export class ThematicsModule {}
