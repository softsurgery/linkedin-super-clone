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
  try {
    switch (req.method) {
      case "GET": {
        const permissions = await permissionRepo.findAll();
        return res.status(200).json(permissions);
      }
      case "POST": {
        const permission = await permissionRepo.create(req.body);
        return res.status(201).json(permission);
      }
      default:
        return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error });
  }
}
