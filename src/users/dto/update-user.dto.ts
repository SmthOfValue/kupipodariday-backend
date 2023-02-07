import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  //   @IsString()
  //   @IsNotEmpty()
  //   @Length(2, 30)
  //   username: string;
  //   @IsEmail()
  //   @IsNotEmpty()
  //   email: string;
  //   @IsString()
  //   @IsNotEmpty()
  //   password: string;
  //   @IsString()
  //   @IsOptional()
  //   avatar: string;
  //   @IsString()
  //   @Length(2, 200)
  //   @IsOptional()
  //   about: string;
}
