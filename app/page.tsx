import BestProducts from "@/components/BestProducts"
import SearchContainer from "@/components/SearchContainer"

export default async function Home() {
  return (
    <div className="space-y-6">
      <SearchContainer />
      <BestProducts />
    </div>
  )
}

