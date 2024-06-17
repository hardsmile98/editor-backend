import { IsString } from 'class-validator';

export class ModulesQueryDto {
  @IsString()
  uuid: string;
}
