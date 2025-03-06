"use client";

import { Menu, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState } from "react"
import MobileNav from "./mobile-nav"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const [value, setValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방지 (폼 제출 방지 등)
      router.push(`/search?searchword=${value}`)
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-24 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* <Image
            src="/placeholder.svg"
            alt="Pillyze Logo"
            width={32}
            height={32}
          /> */}
          <span className="hidden text-3xl font-bold sm:inline-block">
            PikTok
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div
            className={cn(
              "flex max-w-[600px] flex-1 items-center space-x-2 transition-all",
              isSearchFocused ? "sm:max-w-[600px]" : "sm:max-w-[400px]"
            )}
          >
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="어떤 다이어트 식품을 찾으시나요?"
                className="pl-8"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
          </div>
          {/* <Button variant="default" className="hidden sm:flex">
            App Download
          </Button> */}
        </div>
      </div>
    </header>
  );
}
