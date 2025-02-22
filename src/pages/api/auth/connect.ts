import container from "@/lib/container";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authService = container.AuthService;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await authService.login(email, password);

    // Store session (assuming using cookies or JWT)
    res.status(200).json({ message: "Login successful", user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
