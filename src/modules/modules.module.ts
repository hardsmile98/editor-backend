import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { SchoolsModule } from 'src/schools/schools.module';

@Module({
  imports: [SchoolsModule],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
