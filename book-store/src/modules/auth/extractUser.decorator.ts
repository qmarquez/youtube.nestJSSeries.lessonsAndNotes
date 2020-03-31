import { createParamDecorator } from "@nestjs/common";

export const ExtractUser = createParamDecorator((key, { user }) => key ? user[key] : user);