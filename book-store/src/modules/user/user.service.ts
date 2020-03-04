import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UserDetails } from './userDetails.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly mapperService: MapperService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) { }

  async get(id): Promise<UserDTO> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user = await this.userRepository.findOne(id, { where: { status: 'ACTIVE' } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapperService.map<User, UserDTO>(user, new UserDTO);
  }

  async getAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.find({ where: { status: 'ACTIVE' } });

    return this.mapperService.mapCollection<User, UserDTO>(users, new UserDTO);
  }

  async create(user: User): Promise<UserDTO> {
    const details = new UserDetails;
    user.details = details;

    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({ where: { name: "GENERAL" } });
    user.roles = [defaultRole];

    const savedUser = await this.userRepository.save(user);

    return this.mapperService.map<User, UserDTO>(savedUser, new UserDTO());
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
