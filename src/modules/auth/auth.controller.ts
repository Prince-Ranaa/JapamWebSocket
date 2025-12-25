import { Request, Response } from "express";
import authService from "./auth.service";

class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const user = await authService.signup(username, email, password);

      return res.status(201).json({
        success: true,
        message: "Signup successful",
        user,
      });
    } catch (err: any) {
      const status = err.status || 400;
      return res.status(status).json({
        success: false,
        message: err.message || "Signup failed",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, token } = await authService.login(email, password);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
    } catch (err: any) {
      const status = err.status || 400;
      return res.status(status).json({
        success: false,
        message: err.message || "Login failed",
      });
    }
  }
}

export default new AuthController();
