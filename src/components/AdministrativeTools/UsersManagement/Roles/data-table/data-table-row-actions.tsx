import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@/types/role";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import {
  Copy,
  CopyIcon,
  Download,
  Settings2,
  Telescope,
  Trash2,
} from "lucide-react";
import { useRoleActions } from "./action-context";
import { useRoleManager } from "../hooks/useRoleManager";

interface DataTableRowActionsProps {
  row: Row<Role>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const role = row.original;
  const { openUpdateRoleSheet, openDeleteRoleDialog, openDuplicateRoleDialog } = useRoleActions();

  const roleManager = useRoleManager();

  const targetRole = () => {
    roleManager.setRole(role);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[160px]">
        <DropdownMenuLabel className="text-center">Actions </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => { }}>
          <Telescope className="h-5 w-5 mr-2" /> Inspect
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            targetRole();
            openUpdateRoleSheet();
          }}
        >
          <Settings2 className="h-5 w-5 mr-2" /> Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          targetRole();
          openDuplicateRoleDialog();
        }}>
          <CopyIcon className="h-5 w-5 mr-2" /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            targetRole();
            openDeleteRoleDialog();
          }}
        >
          <Trash2 className="h-5 w-5 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
