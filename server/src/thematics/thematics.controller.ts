import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ThematicsService } from './thematics.service';
import { ThematicDto } from './dto/thematic.dto';

@Controller('thematics')
export class ThematicsController {
  constructor(private readonly thematicsService: ThematicsService) {}
  @Get()
  getCities() {
    return this.thematicsService.getAll();
  }

  @Get('/:value')
  getCityByValue(@Param('value') value: string) {
    return this.thematicsService.getByValue(value);
  }

  @Post()
  createCity(@Body() dto: ThematicDto) {
    return this.thematicsService.create(dto);
  }
}
