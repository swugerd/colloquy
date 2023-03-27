import { City } from './models/cities.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CitiesController } from './cities.controller';
import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
  imports: [SequelizeModule.forFeature([City])],
})
export class CitiesModule {}
