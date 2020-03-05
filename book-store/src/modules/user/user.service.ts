import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDetails } from './userDetails.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) { }

  async get(id): Promise<User> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this.userRepository.findOne(id, { where: { status: 'ACTIVE' } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { status: 'ACTIVE' } });

    return users;
  }

  async create(user: User): Promise<User> {
    const details = new UserDetails;
    user.details = details;

    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({ where: { name: "GENERAL" } });
    user.roles = [defaultRole];

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: number, user: User): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this.userRepository.findOne(id, { where: { status: 'ACTIVE' } });

    if (!user) {
      throw new NotFoundException();
    }

    user.status = 'INACTIVE';

    user.save();
  }
}
