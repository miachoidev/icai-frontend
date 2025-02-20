"use client"

import { ChevronDown, Home, Pill, ShoppingBag, Star, HelpCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const sidebarNavItems = [
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
  {
    title: "FAQ",
    icon: HelpCircle,
    href: "/faq",
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="hidden border-r bg-background lg:block">
      <ScrollArea className="h-[calc(100vh-3.5rem)] w-64 py-6">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {sidebarNavItems.map((item) => (
                <div key={item.href}>
                  <Link href={item.href}>
                    <span
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent" : "transparent",
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                      {item.children && <ChevronDown className="ml-auto h-4 w-4" />}
                    </span>
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <span
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                              pathname === child.href ? "bg-accent" : "transparent",
                            )}
                          >
                            {child.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </nav>
  )
}

