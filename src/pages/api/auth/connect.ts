import container from "@/lib/container";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authService = container.AuthService;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", code: 405 });
  }

  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required", code: 400 });
    }

    const data = await authService.connect({ usernameOrEmail, password });
    delete data.user.password;

    res.status(200).json({ message: "Connection successful", code: 200, data });
  } catch (error: any) {
    res.status(401).json({ error: error.message, code: 401 });
  }
}
