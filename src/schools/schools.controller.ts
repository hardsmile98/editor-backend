import { Body, Controller, Get, Post } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { GetUser, TgUser } from 'src/global/decorator';
import { SchoolDto } from './dto';

@Controller('schools')
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @Get('/')
  getSchools(@GetUser() user: TgUser) {
    return this.schoolsService.getSchools(user);
  }

  @Post('/add')
  addSchool(@GetUser() user: TgUser, @Body() school: SchoolDto) {
    return this.schoolsService.addSchool(user, school);
  }
}
