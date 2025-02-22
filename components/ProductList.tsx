"use client";

import { Product } from "@/types/Product";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

async function getProducts(afterId?: ObjectId) {
  const limit = 20
  const query = afterId ? `/api/products?limit=${limit}&afterId=${afterId.toString()}` : `/api/products?limit=${limit}`;
  const response = await fetch(query);
  const products = await response.json();
  return products;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lastId, setLastId] = useState<ObjectId | undefined>(undefined);
  const { ref, inView } = useInView();

  const loadProducts = async () => {
    const products = await getProducts(lastId);
    setProducts(products);
    setLastId(products[products.length - 1]._id);
  };

  useEffect(() => {
    if (inView) {
      loadProducts();
    }
  }, [inView]);

  return (
    <>
      {products.map((product) => (
        <Link key={product._id.toString()} href={`/product/${product._id.toString()}`}>
          <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-0">
          {/* <div className="aspect-square relative">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div> */}
          <div className="p-4 space-y-2">
            <div className="text-sm text-muted-foreground">{product.ENTRPS}</div>
            <h3 className="font-medium leading-tight">{product.PRDUCT}</h3>
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
      ))}
      <div ref={ref}>loading...</div>
      
    </>
  );
}
