import { BadRequestException, Injectable } from '@nestjs/common';
import { TgUser } from 'src/global/decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getOwnerProfile(user: TgUser) {
    try {
      const findedUser = await this.prismaService.owners.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!findedUser) {
        const newUser = await this.prismaService.owners.create({
          data: {
            userId: user.id,
            username: user.username,
            name: user.first_name,
          },
        });

        return {
          user: newUser,
          success: true,
        };
      }

      return {
        user: findedUser,
        success: true,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
