import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Thematic } from './models/thematics.model';
import { ThematicDto } from './dto/thematic.dto';

@Injectable()
export class ThematicsService {
  constructor(@InjectModel(Thematic) private readonly thematicsRepository: typeof Thematic) {}
  async getAll() {
    const cities = await this.thematicsRepository.findAll();
    const modifiedData = cities.map(({ id, thematic_name, thematic_value }) => {
      return { id, value: thematic_value, label: thematic_name };
    });

    return modifiedData;
  }

  async create(dto: ThematicDto) {
    const createdCity = await this.thematicsRepository.create(dto);
    return createdCity;
  }

  async getByValue(value: string) {
    const city = await this.thematicsRepository.findOne({ where: { thematic_value: value } });
    return city;
  }
}
