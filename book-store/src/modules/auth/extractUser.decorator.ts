import { createParamDecorator } from "@nestjs/common";
import { UserDTO } from "../user/dto/user.dto";

export const ExtractUser = createParamDecorator((data, { user }): UserDTO => user);