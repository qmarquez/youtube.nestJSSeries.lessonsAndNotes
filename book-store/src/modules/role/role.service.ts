import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository
  ) { }

  async get(id): Promise<Role> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role = await this.roleRepository.findOne(id, { where: { status: 'ACTIVE' } });

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async getAll(): Promise<Role[]> {
    const roles = await this.roleRepository.find({ where: { status: 'ACTIVE' } });

    return roles;
  }

  async create(role: Role): Promise<Role> {
    const savedRole = await this.roleRepository.save(role);

    return savedRole;
  }

  async update(id: number, role: Role): Promise<void> {
    await this.roleRepository.update(id, role);
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role = await this.roleRepository.findOne(id, { where: { status: 'ACTIVE' } });

    if (!role) {
      throw new NotFoundException();
    }

    role.status = 'INACTIVE';

    role.save();
  }
}
