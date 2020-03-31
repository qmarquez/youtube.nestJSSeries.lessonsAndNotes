import { IsNumber, IsEmail, IsString } from "class-validator";
import { ReadUserDetailsDTO } from "./read-user-details.dto";
import { Type, Exclude, Expose } from "class-transformer";
import { ReadRoleDTO } from "../../role/dto";

@Exclude()
export class ReadUserDTO {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsString()
  readonly username: string;

  @Expose()
  @Type(() => ReadUserDTO)
  readonly details: ReadUserDetailsDTO;

  @Expose()
  @Type(() => ReadRoleDTO)
  readonly roles: ReadRoleDTO[];
}