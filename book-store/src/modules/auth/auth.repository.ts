import { Repository, EntityRepository, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import { SignupDTO } from "./dto";
import { Role } from "../role/role.entity";
import { RoleType } from "../role/roleType.enum";
import { UserDetails } from "../user/userDetails.entity";
import { hash } from "bcryptjs";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDTO: SignupDTO) {
    const { username, email, password } = signupDTO;

    const user = new User;

    user.username = username;
    user.email = email;

    const roleRepository = getConnection().getRepository(Role);
    const defaultRole = await roleRepository.findOne({ where: { name: RoleType.GENERAL } });
    user.roles.push(defaultRole);

    const details = new UserDetails;
    user.details = details;

    user.password = await hash(password, 10);

    await user.save();
  }
}