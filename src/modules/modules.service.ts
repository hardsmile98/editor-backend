import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPositionDto, ModulesQueryDto } from './dto';

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
          parentId: null,
        },
        include: {
          module: true,
        },
        orderBy: {
          index: 'asc',
        },
      });

      const filtered = schoolModules.map((module) => ({
        id: undefined,
        ...module,
      }));

      return {
        schoolModules: filtered,
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // ПРИ ДОБАВЛЕНИИ/РЕДАКТИРОВАНИИ ПРОВЕРЯТЬ ЧТО ЭТО ВЛАДЕЛЕЦ
  async editPositionModules(editPositionDto: EditPositionDto) {
    try {
      return {
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
