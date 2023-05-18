import {
  IsOptional,
  IsNumber,
  IsBooleanString,
  IsInt,
  IsNumberString,
  IsBoolean,
} from 'class-validator';

export class UserQueryParams {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  groupId?: number = 0;

  @IsOptional()
  q?: string = '';

  @IsOptional()
  @IsNumber()
  city?: number = 0;

  @IsOptional()
  @IsNumber()
  ageFrom?: number = 0;

  @IsOptional()
  @IsNumber()
  ageTo?: number = 0;

  @IsOptional()
  maleGender?: string = '';

  @IsOptional()
  femaleGender?: string = '';

  @IsOptional()
  @IsBoolean()
  online?: boolean = false;
}
