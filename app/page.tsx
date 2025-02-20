import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const products = [
  {
    id: 1,
    name: "살펜다 혈당컷 다이어트",
    brand: "한국건강",
    rating: 4.51,
    reviews: 139,
    image: "/placeholder.svg",
    tags: ["단백질 대사", "체지방 감소"],
    sponsored: true,
  },
  {
    id: 2,
    name: "세리번 콜드라인",
    brand: "세리박스",
    rating: 3.67,
    reviews: 3,
    image: "/placeholder.svg",
    tags: ["체지방 감소", "녹차추출물"],
  },
  // Add more products as needed
]

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Featured Products</h1>
        <Button variant="ghost">View all</Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                  <h3 className="font-medium leading-tight">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {product.sponsored && <div className="text-xs text-muted-foreground">Sponsored</div>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

