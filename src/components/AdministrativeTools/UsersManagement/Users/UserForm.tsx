import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useUserManager } from "./hooks/useUserManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Role } from "@/types/user-management";
import { CheckedState } from "@radix-ui/react-checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";

interface UserFormProps {
  className?: string;
  roles?: Role[];
  forceShowPasswordInputs?: boolean;
  loading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  className,
  roles,
  forceShowPasswordInputs = true,
  loading,
}) => {
  const userManager = useUserManager();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showPasswordInputs, setShowPasswordInputs] = React.useState(false);

  const handleShowPasswordInputs = (checked: CheckedState) => {
    const value = showPasswordInputs ? undefined : "";
    setShowPasswordInputs(checked as boolean);
    userManager.set("password", value);
    userManager.set("confirmPassword", value);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* General information */}
      <div className="my-2 flex flex-col gap-2">
        <h1 className="text-lg my-2 font-bold">General Information</h1>
        <div className="flex flex-row gap-2">
          {/* firstName */}
          <div className="w-1/2">
            <Label>Firstname</Label>
            <div className="mt-1">
              <Input
                placeholder="Ex. John"
                value={userManager.firstName}
                onChange={(e) => userManager.set("firstName", e.target.value)}
              />
            </div>
          </div>
          {/* lastName */}
          <div className="w-1/2">
            <Label>Lastname</Label>
            <div className="mt-1">
              <Input
                placeholder="Ex. Doe"
                value={userManager.lastName}
                onChange={(e) => userManager.set("lastName", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* email */}
        <div>
          <Label>E-Mail (*)</Label>
          <div className="mt-1">
            <Input
              type="email"
              placeholder="Ex. This is awesome!"
              value={userManager.email}
              onChange={(e) => userManager.set("email", e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        {/* dateOfBirth */}
        <div>
          <Label>Date of Birth</Label>
          <div className="w-full mt-2">
            <DatePicker
              className="w-full"
              value={
                (userManager?.dateOfBirth &&
                  new Date(userManager.dateOfBirth)) ||
                undefined
              }
              onChange={(value: Date) => {
                userManager.set("dateOfBirth", new Date(value));
              }}
            />
          </div>
        </div>
      </div>
      {/* Account Information */}
      <div className="my-2 flex flex-col gap-2">
        <h1 className="text-lg mt-4 mb-2 font-bold">Account Information</h1>
        {/* username */}
        <div>
          <Label>Username (*)</Label>
          <div className="mt-1">
            <Input
              placeholder="Ex. Awesome Administrator"
              value={userManager.username}
              onChange={(e) => userManager.set("username", e.target.value)}
            />
          </div>
        </div>
        {!forceShowPasswordInputs && (
          <div className="items-top flex space-x-2 my-4">
            <Checkbox
              id="show-password-inputs"
              checked={showPasswordInputs}
              onCheckedChange={handleShowPasswordInputs}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="show-password-inputs"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Update User Password
              </label>
              <p className="text-sm text-muted-foreground">
                Check this option if you want to change{" "}
                <span className="opacity-70">
                  {userManager.lastName} {userManager.firstName}
                </span>
                &apos;s password
              </p>
            </div>
          </div>
        )}
        {(forceShowPasswordInputs || showPasswordInputs) && (
          <div>
            <Label>New Password</Label>
            <div className="mt-1">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  value={userManager.password}
                  onChange={(e) => userManager.set("password", e.target.value)}
                  autoComplete="new-password"
                />
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  variant={"link"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
          </div>
        )}

        {(forceShowPasswordInputs || showPasswordInputs) && (
          <div>
            <Label>Confirm Password</Label>
            <div className="mt-1">
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  className="pr-10"
                  value={userManager.confirmPassword}
                  onChange={(e) =>
                    userManager.set("confirmPassword", e.target.value)
                  }
                  autoComplete="new-password"
                />
                <Button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  variant={"link"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* role */}
        <div>
          <Label>Role (*)</Label>
          <div className="w-full mt-1">
            <Select
              onValueChange={(value) => {
                userManager.set("roleId", parseInt(value));
              }}
              value={userManager.roleId?.toString() || ""}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Role..." />
              </SelectTrigger>
              <SelectContent>
                {roles?.map((role: Partial<Role>) => (
                  <SelectItem
                    key={role.id}
                    value={role.id?.toString() || ""}
                    className="mx-1"
                  >
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* require password */}
        <div className="items-top flex space-x-2 my-2">
          <Checkbox id="force-password-change" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="force-password-change"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Require Password Update
            </label>
            <p className="text-sm text-muted-foreground">
              Users will be prompted to update their password on their next
              login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
