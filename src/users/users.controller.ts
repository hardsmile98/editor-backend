import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser, TgUser } from 'src/global/decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/owner')
  getOwnerProfile(@GetUser() user: TgUser) {
    return this.usersService.getOwnerProfile(user);
  }
}
