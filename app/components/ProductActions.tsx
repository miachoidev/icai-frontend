"use client";

import { Button } from "@/components/ui/button";

interface ProductActionsProps {
  onChatToggle: () => void;
}

export default function ProductActions({ onChatToggle }: ProductActionsProps) {
  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={onChatToggle}
      >
        핏블리와 대화하기
      </Button>
      <Button className="w-full" variant="outline" size="lg">
        썬시티
      </Button>
    </div>
  );
}
