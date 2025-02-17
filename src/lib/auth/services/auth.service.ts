import { UserService } from "@/lib/users-management/services/user.service";
import { comparePasswords, hashPassword } from "../utils/password.utils";
import { User } from "@/types/user-management";

export class AuthService {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return user;
  }

  async register(data: Partial<User>) {
    const hashedPassword = data.password && (await hashPassword(data.password));
    data.password = hashedPassword;
    data.isActive = false;

    const user = await this.userService.createUser(data);
    return user;
  }
}
