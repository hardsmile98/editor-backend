import { IsNumber, IsString } from 'class-validator';

export class AddModuleDto {
  @IsNumber()
  moduleId: number;

  @IsString()
  schoolUuid: string;
}
