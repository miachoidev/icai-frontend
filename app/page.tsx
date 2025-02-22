import ProductList from "@/components/ProductList"

export default async function Home() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductList />
      </div>
    </div>
  )
}

