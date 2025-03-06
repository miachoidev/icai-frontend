"use client";

import { Product } from "@/types/Product";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

async function getCategory(keyword: string) {
  // const limit = 20
  // const query = `/api/category?category2=${keyword}`;
  const query = `/api/recent-products?category2=${keyword}`;
	console.log(query);
  const response = await fetch(query);
  const products = await response.json();
  return products;
}

export default function CategoryList({ searchword }: { searchword: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const { ref, inView } = useInView();

  const loadProducts = async () => {
    const products = await getCategory(searchword);
		console.log(products);
    setProducts(products);
  };

  useEffect(() => {
    if (inView) {
      loadProducts();
    }
  }, [inView]);

  return (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product._id.toString()}
            href={`/products/${product._id.toString()}`}
          >
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.PRODUCT}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {product.ENTRPS}
                  </div>
                  <h3 className="font-medium leading-tight">
                    {product.PRODUCT}
                  </h3>
                  {/* <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews})</span>
            </div> */}
                  {/* <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div> */}
                  {/* {product.sponsored && <div className="text-xs text-muted-foreground">Sponsored</div>} */}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <div ref={ref}>loading...</div>
      )}
    </>
  );
}
