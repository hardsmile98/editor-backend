import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddModuleDto, EditPositionDto, ModulesQueryDto } from './dto';
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
      select: {
        uuid: true,
      },
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

      const moduleAdded = await this.prismaService.schoolModules.findMany({
        where: {
          schoolUuid: editPositionDto.schoolUuid,
        },
      });

      const deleted = moduleAdded.filter(
        (el) =>
          !editPositionDto.editedModules.some(
            (module) => module.moduleId === el.moduleId,
          ),
      );

      if (deleted.length) {
        await this.prismaService.schoolModules.deleteMany({
          where: {
            schoolUuid: editPositionDto.schoolUuid,
            moduleId: {
              in: deleted.map((el) => el.moduleId),
            },
          },
        });
      }

      await this.prismaService.$transaction(async (tx) => {
        await Promise.all(
          editPositionDto.editedModules.map(async (module) => {
            await tx.schoolModules.updateMany({
              where: {
                moduleId: module.moduleId,
                schoolUuid: editPositionDto.schoolUuid,
              },
              data: {
                index: module.index,
              },
            });
          }),
        );
      });

      return {
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addModule(user: TgUser, addModuleDto: AddModuleDto) {
    try {
      await this.checkAccess({
        userId: user.id,
        schoolUuid: addModuleDto.schoolUuid,
      });

      const moduleAdded = await this.prismaService.schoolModules.findMany({
        where: {
          schoolUuid: addModuleDto.schoolUuid,
        },
      });

      const index = moduleAdded.length;

      const isAlreadyAdded = moduleAdded.find(
        (module) => module.moduleId === addModuleDto.moduleId,
      );

      if (isAlreadyAdded) {
        throw new BadRequestException('Этот модуль уже добавлен');
      }

      await this.prismaService.schoolModules.create({
        data: {
          index,
          moduleId: addModuleDto.moduleId,
          schoolUuid: addModuleDto.schoolUuid,
          settings: {},
        },
      });

      return {
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
