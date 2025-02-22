import DifyChat from "@/app/components/DifyChat";
import DifyChatButton from "@/components/DifyChatButton";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/request";
import { Product } from "@/types/Product";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, fetch product data based on params.id
  const fetched = await fetch(
    `${BASE_URL}/api/products/${params.id}`
  );
  const product: Product | null = await fetched.json();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {/* <div className="aspect-square relative overflow-hidden rounded-lg border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div> */}
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              {product.ENTRPS}
            </div>
            <h1 className="text-3xl font-bold">{product.PRDUCT}</h1>
            {/* <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
            </div> */}
          </div>
          {/* <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div> */}
          <p className="text-muted-foreground">{product.BASE_STANDARD}</p>
          <div className="space-y-2">
            <DifyChatButton />
            <Button className="w-full" variant="outline" size="lg">
              리플 의사
            </Button>
            <Button className="w-full" variant="outline" size="lg">
              썬시티
            </Button>
          </div>
        </div>
      </div>
      <DifyChat />
    </div>
  );
}
