import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0");
  res.status(200).json({ message: "Logged out successfully" });
}
