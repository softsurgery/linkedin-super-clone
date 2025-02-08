// pages/api/permission/[id].ts
import container from "@/lib/container";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const permissionService = container.PermissionService;
  const { id } = req.query;
  
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const permission = await permissionService.getPermissionById(Number(id));
        if (!permission) {
          return res.status(404).json({ error: "Permission not found" });
        }
        return res.status(200).json(permission);
      }
      case "PUT": {
        const updatedPermission = await permissionService.updatePermission(Number(id), req.body);
        return res.status(200).json(updatedPermission);
      }
      case "DELETE": {
        await permissionService.deletePermission(Number(id));
        return res.status(204).end();
      }
      default:
        return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", details: error });
  }
}
