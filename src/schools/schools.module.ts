import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { TelegamModule } from 'src/telegam/telegam.module';

@Module({
  imports: [TelegamModule],
  providers: [SchoolsService],
  controllers: [SchoolsController],
})
export class SchoolsModule {}
