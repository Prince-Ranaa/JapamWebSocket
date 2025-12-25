import User from "./user.model";
import bcrypt from "bcrypt";
import { signToken } from "../../utils/jwt";

class AuthService {
  async signup(username: string, email: string, password: string) {
    email = email.toLowerCase();

    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already registered");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashed });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
  }

  async login(email: string, password: string) {
    email = email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist");

    const match = await bcrypt.compare(password, user.password!);
    if (!match) throw new Error("Invalid credentials");

    const token = signToken({ id: user._id });

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
  }
}

export default new AuthService();
