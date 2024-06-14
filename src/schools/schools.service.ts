import { BadRequestException, Injectable } from '@nestjs/common';
import { TgUser } from 'src/global/decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolDto } from './dto';

@Injectable()
export class SchoolsService {
  constructor(private prismaService: PrismaService) {}

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
