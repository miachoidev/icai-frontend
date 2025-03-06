"use client";

import { useState, FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* <h2 className="text-2xl font-semibold mb-4 text-center">어떤 다이어트 식품을 찾으시나요?</h2> */}
      <form onSubmit={handleSubmit} className="flex gap-3 bg-background rounded-full shadow-lg overflow-hidden p-1.5">
        <div className="flex-1 flex items-center pl-6">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            type="text"
            placeholder="제품명, 영양성분, 건강고민을 검색해보세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-6 border-none shadow-none bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70"
          />
        </div>
        <Button type="submit" variant="default" size="lg" className="px-8 text-base rounded-full font-medium">
          검색
        </Button>
      </form>
    </div>
  );
} 