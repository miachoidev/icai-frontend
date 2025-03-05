"use client";

import { Home, Pill, ShoppingBag, Star, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Products",
    icon: ShoppingBag,
    href: "/products",
  },
  {
    title: "Pillyze Store",
    icon: Pill,
    href: "/store",
  },
  {
    title: "Supplement Search",
    icon: Star,
    href: "/search",
    children: [
      { title: "By Ingredient", href: "/search/ingredient" },
      { title: "By Effect", href: "/search/effect" },
      { title: "By Brand", href: "/search/brand" },
    ],
  },
  // {
  //   title: "FAQ",
  //   icon: HelpCircle,
  //   href: "/faq",
  // },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="h-full py-6">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <Accordion type="single" collapsible className="w-full">
                {mobileNavItems.map((item) => (
                  <AccordionItem key={item.href} value={item.href}>
                    {item.children ? (
                      <>
                        <AccordionTrigger className="py-2">
                          <span className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="ml-4 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <Link key={child.href} href={child.href}>
                                <span
                                  className={cn(
                                    "block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    pathname === child.href
                                      ? "bg-accent"
                                      : "transparent"
                                  )}
                                >
                                  {child.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </>
                    ) : (
                      <Link href={item.href}>
                        <span
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === item.href ? "bg-accent" : "transparent"
                          )}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </span>
                      </Link>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
