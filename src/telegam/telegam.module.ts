import { Module } from '@nestjs/common';
import { TelegamService } from './telegam.service';
import { TelegamController } from './telegam.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TelegamService],
  controllers: [TelegamController],
  exports: [TelegamService],
})
export class TelegamModule {}
