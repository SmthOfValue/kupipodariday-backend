import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwtAuth.guard';
import { User } from './entities/user.entity';
import { USER_NOT_FOUND } from 'src/auth/constants/constants';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  async getProfile(@Req() { user }: { user: User }) {
    const profile = await this.usersService.findOne(user.id);

    if (!profile) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return profile;
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = this.usersService.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  @Patch('me')
  async update(
    @Req() { user }: { user: User },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(user.id, updateUserDto);
  }

  @Post('find')
  async searchUsers(@Body() { query }: { query: string }) {
    return await this.usersService.findMany(query);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
