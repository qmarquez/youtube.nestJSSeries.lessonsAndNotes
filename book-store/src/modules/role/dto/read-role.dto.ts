import { IsString, MaxLength, IsNumber } from "class-validator";
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDTO {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'Name not valid' })
  readonly name: string;


  @Expose()
  @IsString()
  @MaxLength(100, { message: 'Description not valid' })
  readonly description: string;
}