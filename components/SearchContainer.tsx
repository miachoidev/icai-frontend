"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Image from "next/image";

export default function SearchContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  // 검색 결과가 표시될 때 스크롤 효과
  useEffect(() => {
    if (searchQuery && isSearching) {
      const resultsElement = document.getElementById("search-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchQuery, isSearching]);

  return (
    <div className="relative">
      {/* 배경 이미지와 오버레이 */}
      <div className="absolute inset-0 -z-10 h-[500px] overflow-hidden">
        {/* <Image
          src="/images/healthy-food-bg.jpg"
          alt="건강한 식품 배경"
          fill
          priority
          className="object-cover opacity-20"
        /> */}
        <div className="absolute inset-0 bg-background"></div>
      </div>

      {/* 검색 영역 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-16 pb-24 px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold mb-4 text-[#6C2FF2]">
            제품을 Pick 하고 전문가와 Talk 하세요!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            어떤 다이어트 식품을 찾으시나요? 건강한 선택을 도와드립니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          // className="relative z-10 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-border/50"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>
      </motion.div>

      {/* 검색 결과 영역 */}
      <div id="search-results" className="bg-background min-h-[10px]">
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 py-8"
          >
            <SearchResults searchQuery={searchQuery} />
          </motion.div>
        )}
      </div>
    </div>
  );
} 