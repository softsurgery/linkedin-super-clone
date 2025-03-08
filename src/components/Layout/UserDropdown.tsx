import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Settings, Settings2, User, UserPen } from "lucide-react";
import { useRouter } from "next/router";
import { ExitIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useAuthPersistStore } from "@/hooks/store/useAuthPersistStore";

interface UserDropdownProps {
  className?: string;
}

export const UserDropdown = ({ className }: UserDropdownProps) => {
  const router = useRouter();
  const authPersistStore = useAuthPersistStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("overflow-hidden rounded-full", className)}
        >
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="left">
        <DropdownMenuLabel>👋 Welcome Back, Marwa</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row items-center">
          <UserPen className="h-6 w-6" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row items-center"
          onClick={() => router.push("/settings")}
        >
          <Settings className="h-6 w-6" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row items-center"
          onClick={() => router.push("/support")}
        >
          <LifeBuoy className="h-6 w-6" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-row items-center"
          onClick={() => authPersistStore.logout()}
        >
          <ExitIcon className="h-6 w-6" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
