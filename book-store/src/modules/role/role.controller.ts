import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) { }

  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number) {
    const role = await this.roleService.get(id);
    return role;
  }

  @Get()
  async getRoles() {
    const roles = await this.roleService.getAll();
    return roles
  }

  @Post()
  async createRole(@Body() role: Role) {
    const createdRole = await this.roleService.create(role);
    return createdRole;
  }

  @Patch(':id')
  async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Role) {
    const createdRole = await this.roleService.update(id, role);
    return createdRole;
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    await this.roleService.delete(id);
    return true;
  }
}
