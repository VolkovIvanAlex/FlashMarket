import { UsersService } from './users.service';
import { FindUserDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(query: FindUserDto): Promise<{
        id: string;
        email: string;
        address: string | null;
        username: string | null;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
