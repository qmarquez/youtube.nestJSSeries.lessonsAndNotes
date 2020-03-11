import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) { }

  async get(id): Promise<User> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this.userRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { status: status.ACTIVE } });

    return users;
  }

  async update(id: number, user: User): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.get(id);
    user.status = status.INACTIVE;

    user.save();
  }

  async setRoleToUser(userId: number, roleId: number) {
    const user = await this.get(userId);

    const role = await this.roleRepository.findOne(roleId, {
      where: { status: status.ACTIVE }
    });

    if (!role) {
      throw new NotFoundException('Role not exists.');
    }

    user.roles.push(role)
    await user.save();

    return true;
  }
}
