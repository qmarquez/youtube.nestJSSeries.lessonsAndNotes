import { Injectable } from "@nestjs/common";
import { TypeMapper } from 'ts-mapper';
import { User } from "../modules/user/user.entity";
import { UserDTO } from "../modules/user/user.dto";

@Injectable()
export class MapperService extends TypeMapper {
  constructor() {
    super();
    this.createMap<User, UserDTO>()
      .map(user => user.id, dto => dto.id)
      .map(user => user.username, dto => dto.username)
      .map(user => user.email, dto => dto.email)
      .map(user => user.details, dto => dto.details)
      .map(user => user.roles, dto => dto.roles)
  }
}