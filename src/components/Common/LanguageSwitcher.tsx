import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  const switchLanguage = (lng: string) => {
    changeLanguage(lng);
  };

  return (
    <div className={cn("-mt-1", className)}>
      <Select onValueChange={(value) => switchLanguage(value)}>
        <SelectTrigger className="border-0">
          <SelectValue
            className="border-0"
            placeholder={<Languages size={15} />}
          />
        </SelectTrigger>
        <SelectContent defaultValue={"en"} className="p-1">
          <SelectItem value="fr">{t("french")}</SelectItem>
          <SelectItem value="en">{t("english")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};