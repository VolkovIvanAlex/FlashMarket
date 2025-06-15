import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class FindUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
