import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface SupportProps {
  className?: string;
}

export const Support = ({ className }: SupportProps) => {
  const { setRoutes } = useBreadcrumb();
  React.useEffect(() => {
    setRoutes?.([{ title: "Support" }]);
  }, []);
  return (
    <div
      className={cn(
        "flex-1 flex flex-col overflow-hidden m-5 lg:mx-10",
        className
      )}
    >
      <div className="space-y-0.5 py-5 sm:py-0">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Support
        </h1>
        <p className="text-muted-foreground">
          By troubleshooting technical issues, updating content and
          functionality, monitoring performance, providing user support, and
          enhancing security and compliance, this page helps you ensure that
          your experience is always running smoothly and meeting your needs.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How do I report a bug?</AccordionTrigger>
          <AccordionContent>
            You can report a bug by clicking the &quot;Report an issue&quot;
            button below, which will direct you to our GitHub issues page.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How can I contact support?</AccordionTrigger>
          <AccordionContent>
            You can join our Discord server for real-time support or open a
            ticket on our support platform.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-6 flex flex-col items-center gap-4"></div>
    </div>
  );
};
