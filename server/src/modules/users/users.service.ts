
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindUserDto } from './dto/users.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    ) {}

  async loginWithEmail(options: FindUserDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: options.email,
      },
    });
    if (!user) {
      throw new NotFoundException('The user with such email was not found.');
    }
    return user;
  }
}