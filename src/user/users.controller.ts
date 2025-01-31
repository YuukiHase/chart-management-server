import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (user) {
        return user;
    } else {
        throw new NotFoundException('User not found!')
    }
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('signIn')
  signIn(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<User | null> {
    return this.usersService.validateUser(email, password);
  }
}
