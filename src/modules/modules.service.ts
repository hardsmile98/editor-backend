import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModulesQueryDto } from './dto';

@Injectable()
export class ModulesService {
  constructor(private prismaService: PrismaService) {}

  async getModules() {
    try {
      const modules = await this.prismaService.modules.findMany({});

      return {
        modules,
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getSchoolModules(query: ModulesQueryDto) {
    try {
      const schoolModules = await this.prismaService.schoolModules.findMany({
        where: {
          schoolUuid: query.uuid,
          parentId: 0,
        },
      });

      return {
        schoolModules,
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
