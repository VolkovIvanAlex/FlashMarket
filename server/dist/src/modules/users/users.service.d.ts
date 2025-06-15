import { PrismaService } from '../prisma/prisma.service';
import { FindUserDto } from './dto/users.dto';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    loginWithEmail(options: FindUserDto): Promise<User>;
}
