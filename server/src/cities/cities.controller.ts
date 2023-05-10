import { CitiesService } from './cities.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityDto } from './dto/city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  @Get()
  getCities() {
    return this.citiesService.getAll();
  }

  @Get('/:value')
  getCityByValue(@Param('value') value: string) {
    return this.citiesService.getByValue(value);
  }

  @Post()
  createCity(@Body() dto: CityDto) {
    return this.citiesService.create(dto);
  }
}
