import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.get(id);
    return user;
  }

  @UseGuards(AuthGuard())
  @Get()
  async getUsers() {
    const users = await this.userService.getAll();
    return users
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    const createdUser = await this.userService.update(id, user);
    return createdUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
    return true;
  }

  @Post('set_role/:userId/:roleId')
  async setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ) {
    return this.userService.setRoleToUser(userId, roleId);
  }
}
