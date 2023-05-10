import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './models/cities.model';
import { CityDto } from './dto/city.dto';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City) private readonly citiesRepository: typeof City) {}
  async getAll() {
    const cities = await this.citiesRepository.findAll();
    const modifiedData = cities.map(({ id, city_name, city_value }) => {
      return { id, value: city_value, label: city_name };
    });

    return modifiedData;
  }

  async create(dto: CityDto) {
    const createdCity = await this.citiesRepository.create(dto);
    return createdCity;
  }

  async getByValue(value: string) {
    const city = await this.citiesRepository.findOne({ where: { city_value: value } });
    return city;
  }
}
