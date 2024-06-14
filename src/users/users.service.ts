import { BadRequestException, Injectable } from '@nestjs/common';
import { TgUser } from 'src/global/decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getReferals(user: TgUser) {
    try {
      const findedUser = await this.prismaService.user.findUnique({
        where: { userId: user.id },
        select: {
          inviteCode: true,
        },
      });

      const referals = await this.prismaService.user.findMany({
        where: {
          refCode: findedUser.inviteCode,
        },
        select: {
          userId: true,
          name: true,
          username: true,
        },
      });

      return {
        referals,
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
