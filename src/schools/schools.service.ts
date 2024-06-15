import { BadRequestException, Injectable } from '@nestjs/common';
import { TgUser } from 'src/global/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolDto } from './dto';
import { TelegamService } from 'src/telegam/telegam.service';

@Injectable()
export class SchoolsService {
  constructor(
    private prismaService: PrismaService,
    private telegramService: TelegamService,
  ) {}

  async getSchools(user: TgUser) {
    try {
      const schools = await this.prismaService.schools.findMany({
        where: {
          ownerId: user.id,
        },
      });

      return {
        schools,
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async addSchool(user: TgUser, school: SchoolDto) {
    try {
      const isValdiToken = await this.telegramService.checkToken(school.token);

      if (!isValdiToken) {
        throw new BadRequestException('Невалидный API токен');
      }

      await this.prismaService.schools.create({
        data: {
          ownerId: user.id,
          ...school,
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
