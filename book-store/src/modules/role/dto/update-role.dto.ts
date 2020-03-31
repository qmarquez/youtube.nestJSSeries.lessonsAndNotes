import { IsString, MaxLength } from "class-validator";

export class UpdateRoleDTO {
  @IsString()
  @MaxLength(50, { message: 'Name not valid' })
  readonly name: string;


  @IsString()
  @MaxLength(100, { message: 'Description not valid' })
  readonly description: string;
}