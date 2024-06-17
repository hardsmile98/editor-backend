import { Controller, Get, Post, Query } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { GetUser, TgUser } from 'src/global/decorator';
import { EditPositionDto, ModulesQueryDto } from './dto';

@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Get('/all')
  getModules(@GetUser() _user: TgUser) {
    return this.modulesService.getModules();
  }

  @Get('/selected')
  getSchoolModules(
    @GetUser() _user: TgUser,
    @Query() queryParam: ModulesQueryDto,
  ) {
    return this.modulesService.getSchoolModules(queryParam);
  }

  @Post('/editPosition')
  editPosition(@GetUser() user: TgUser, editPositionDto: EditPositionDto) {
    return this.modulesService.editPositionModules(user, editPositionDto);
  }
}
