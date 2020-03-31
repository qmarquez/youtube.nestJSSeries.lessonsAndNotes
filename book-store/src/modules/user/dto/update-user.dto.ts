import { IsEmail } from "class-validator";

export class UpdateUserDTO {
  @IsEmail()
  readonly username: string;
}