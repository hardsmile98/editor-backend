import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { GetUser, TgUser } from 'src/global/decorator';
import { AddModuleDto, EditPositionDto, ModulesQueryDto } from './dto';

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
  editPosition(
    @GetUser() user: TgUser,
    @Body() editPositionDto: EditPositionDto,
  ) {
    return this.modulesService.editPositionModules(user, editPositionDto);
  }

  @Post('/addModule')
  addModule(@GetUser() user: TgUser, @Body() addModuleDto: AddModuleDto) {
    return this.modulesService.addModule(user, addModuleDto);
  }
}
