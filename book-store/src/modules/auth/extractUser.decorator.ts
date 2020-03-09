import { createParamDecorator } from "@nestjs/common";
import { UserDTO } from "../user/user.dto";

export const ExtractUser = createParamDecorator((data, { user }): UserDTO => user);