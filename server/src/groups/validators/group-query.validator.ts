import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class GroupQueryParams {
  @IsNumber()
  userId: number;

  @IsOptional()
  q?: string = '';

  @IsOptional()
  @IsNumber()
  city?: number = 0;

  @IsOptional()
  @IsNumber()
  thematic?: number = 0;

  @IsOptional()
  @IsNumber()
  membersFrom?: number = 0;

  @IsOptional()
  @IsNumber()
  membersTo?: number = 0;
}
