import { IsString } from 'class-validator';

export class ModuleQueryDto {
  @IsString()
  uuid: string;

  @IsString()
  moduleId: string;
}
