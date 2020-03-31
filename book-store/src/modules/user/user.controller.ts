import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  // @Roles(RoleType.ADMINISTRATOR, RoleType.AUTHOR)
  // @UseGuards(AuthGuard(), RoleGuard)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.get(id);
  }

  // @UseGuards(AuthGuard(), RoleGuard)
  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Post('set_role/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ) {
    return this.userService.setRoleToUser(userId, roleId);
  }
}
