import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/status.enum';
import { ReadUserDTO, UpdateUserDTO } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) { }

  async get(id): Promise<ReadUserDTO> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this.userRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDTO, user);
  }

  async getAll(): Promise<ReadUserDTO[]> {
    const users = await this.userRepository.find({ where: { status: status.ACTIVE } });

    return users.map(user => plainToClass(ReadUserDTO, user));
  }

  async update(id: number, user: Partial<UpdateUserDTO>): Promise<ReadUserDTO> {
    const foundUser = await this.userRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!foundUser) {
      throw new NotFoundException('User not exists.');
    }

    foundUser.username = user.username;

    const updatedUser = foundUser.save();

    return plainToClass(ReadUserDTO, updatedUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!user) {
      throw new NotFoundException('User not exists.');
    }

    user.status = status.INACTIVE;

    user.save();
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
    const user = await this.userRepository.findOne(userId, { where: { status: status.ACTIVE } });

    if (!user) {
      throw new NotFoundException('User not exists.');
    }

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
