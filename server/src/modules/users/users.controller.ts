import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import {
  FindUserDto,
} from './dto/users.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('login')
  async findOne(@Query() query: FindUserDto) {
    return this.usersService.loginWithEmail({ ...query});
  }
}
