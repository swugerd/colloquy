import { CitiesService } from './cities.service';
import { Controller, Get } from '@nestjs/common';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  @Get()
  getCities() {
    return this.citiesService.getAll();
  }
}
