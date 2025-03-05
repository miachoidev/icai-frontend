"use client"

import { ChevronDown, Home, Pill, Star, HelpCircle,Atom } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarNavItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  // {
  //   title: "Products",
  //   icon: ShoppingBag,
  //   href: "/products",
  // },
  // {
  //   title: "Pillyze Store",
  //   icon: Pill,
  //   href: "/store",
  // },
  {
    title: "다이어트 (체중관리)",
    icon: Star,
    href: "",
    children: [
      { title: "다이어트", href: "/category/diet" },
      { title: "슬리밍", href: "/category/slimming" },
      { title: "슬림", href: "/category/slim" },
      { title: "칼로리", href: "/category/kcal" },
    ],
  },
  {
    title: "식품 & 보충제",
    icon: Pill,
    href: "",
    children: [
      { title: "닭가슴살", href: "/category/chicken" },
      { title: "쉐이크", href: "/category/shake" },
      { title: "곤약", href: "/category/gonyak" },
      { title: "프로틴", href: "/category/protein" },
    ],
  },
  {
    title: "영양소",
    icon: Atom,
    href: "",
    children: [
      { title: "아르기닌", href: "/category/arginine" },
      { title: "효소", href: "/category/enzyme" },
    ],
  },
  // {
  //   title: "FAQ",
  //   icon: HelpCircle,
  //   href: "/faq",
  // },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 h-full">
        <div className="w-80 space-y-4 py-4">
          <div className="px-3 py-4">
            <div className="space-y-2 ">
              {sidebarNavItems.map((item) => (
                <div key={item.title}>
                  <Link href={item.href}>
                    <span
                      className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground",
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
                        <Link key={child.title} href={child.href}>
                          <span
                            className={cn(
                              "block rounded-md px-3 py-2 text-m font-medium hover:bg-accent hover:text-accent-foreground",
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
    </nav>
  )
}

