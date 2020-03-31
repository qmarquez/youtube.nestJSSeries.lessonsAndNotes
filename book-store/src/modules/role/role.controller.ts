import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { ReadRoleDTO, CreateRoleDTO, UpdateRoleDTO } from './dto';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) { }

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDTO> {
    return this.roleService.get(id);
  }

  @Get()
  async getRoles(): Promise<ReadRoleDTO[]> {
    return this.roleService.getAll();
  }

  @Post()
  createRole(@Body() role: Partial<CreateRoleDTO>): Promise<ReadRoleDTO> {
    return this.roleService.create(role);
  }

  @Patch(':id')
  updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Partial<UpdateRoleDTO>): Promise<CreateRoleDTO> {
    return this.roleService.update(id, role);
  }

  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
