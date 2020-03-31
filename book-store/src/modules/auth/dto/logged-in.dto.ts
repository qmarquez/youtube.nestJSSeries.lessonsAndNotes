import { Expose, Type, Exclude } from "class-transformer";
import { IsString } from "class-validator";
import { ReadUserDTO } from "../../user/dto";

@Exclude()
export class LoggedInDTO {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  @Type(() => ReadUserDTO)
  user: ReadUserDTO;
}