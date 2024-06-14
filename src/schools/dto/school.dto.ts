import { IsString } from 'class-validator';

export class SchoolDto {
  @IsString()
  token: string;

  @IsString()
  title: string;

  @IsString()
  direction: string;
}
