import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get(':id')
  async getUser(@Param() id: number) {
    const user = await this.userService.get(id);
    return user;
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getAll();
    return users
  }

  @Post()
  async createUser(@Body() user: User) {
    const createdUser = await this.userService.create(user);
    return createdUser;
  }

  @Patch(':id')
  async updateUser(@Param() id: number, @Body() user: User) {
    const createdUser = await this.userService.update(id, user);
    return createdUser;
  }

  @Delete(':id')
  async deleteUser(@Param() id: number) {
    await this.userService.delete(id);
    return true;
  }
}
