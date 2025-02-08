// pages/api/permission/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { PermissionRepository } from "@/lib/users-management/repositories/permission.repository";

const prisma = new PrismaClient();
const permissionRepo = new PermissionRepository(prisma);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const permissions = await permissionRepo.findPaginated(req.query);
    return res.status(200).json(permissions);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error });
  }
}
