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

interface UserDropdownProps {
  className?: string;
}

export const UserDropdown = ({ className }: UserDropdownProps) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
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
        <DropdownMenuItem className="flex flex-row items-center">
          <Settings className="h-6 w-6" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row items-center">
          <LifeBuoy className="h-6 w-6" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-row items-center"
          onClick={() => router.push("/disconnect")}
        >
          <ExitIcon className="h-6 w-6" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
