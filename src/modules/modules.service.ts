import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPositionDto, ModulesQueryDto } from './dto';
import { TgUser } from 'src/global/decorator';

@Injectable()
export class ModulesService {
  constructor(private prismaService: PrismaService) {}

  async checkAccess({
    userId,
    schoolUuid,
  }: {
    userId: bigint;
    schoolUuid: string;
  }) {
    const isHaveAccess = await this.prismaService.schools.findFirst({
      where: {
        ownerId: userId,
        uuid: schoolUuid,
      },
    });

    if (!isHaveAccess) {
      throw new BadRequestException('У вас нет доступа');
    }
  }

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

  async editPositionModules(user: TgUser, editPositionDto: EditPositionDto) {
    try {
      await this.checkAccess({
        userId: user.id,
        schoolUuid: editPositionDto.schoolUuid,
      });

      return {
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
