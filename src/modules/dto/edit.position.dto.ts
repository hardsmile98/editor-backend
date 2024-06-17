import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class Modules {
  @IsNumber()
  index: number;

  @IsNumber()
  moduleId: number;
}

export class EditPositionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Modules)
  editedModules: Modules[];

  @IsString()
  schoolUuid: string;
}
