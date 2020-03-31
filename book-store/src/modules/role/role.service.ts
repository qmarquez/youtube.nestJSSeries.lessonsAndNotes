import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/status.enum';
import { ReadRoleDTO, CreateRoleDTO, UpdateRoleDTO } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository
  ) { }

  async get(id: number): Promise<ReadRoleDTO> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role = await this.roleRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!role) {
      throw new NotFoundException('Role not exists');
    }

    return plainToClass(ReadRoleDTO, role);
  }

  async getAll(): Promise<ReadRoleDTO[]> {
    const roles = await this.roleRepository.find({ where: { status: status.ACTIVE } });

    return roles.map(role => plainToClass(ReadRoleDTO, role));
  }

  async create(role: Partial<CreateRoleDTO>): Promise<ReadRoleDTO> {
    const savedRole = await this.roleRepository.save(role);

    return plainToClass(ReadRoleDTO, savedRole);
  }

  async update(id: number, role: Partial<UpdateRoleDTO>): Promise<ReadRoleDTO> {
    const foundRole = await this.roleRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!foundRole) {
      throw new NotFoundException();
    }

    foundRole.name = role.name;
    foundRole.description = role.description;
    
    const updatedRole = await foundRole.save();
    
    return plainToClass(ReadRoleDTO, updatedRole);
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role = await this.roleRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!role) {
      throw new NotFoundException();
    }

    role.status = status.INACTIVE;

    role.save();
  }
}
