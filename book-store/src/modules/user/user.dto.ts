import { IsNotEmpty } from 'class-validator'
import { RoleType } from '../role/roleType.enum';
import { UserDetails } from './userDetails.entity';

export class UserDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  roles: RoleType[];

  @IsNotEmpty()
  details: UserDetails;
}