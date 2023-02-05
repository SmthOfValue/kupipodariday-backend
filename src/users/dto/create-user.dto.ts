import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { IsOptional, Length } from 'class-validator/types/decorator/decorators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @Length(2, 200)
  @IsOptional()
  about: string;
}
