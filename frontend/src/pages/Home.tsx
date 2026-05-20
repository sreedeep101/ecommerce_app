import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { getProducts } from "../services/products"
import type { Product } from "../types/product"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {

    fetchProducts()

  }, [])

  const fetchProducts = async () => {
    try {

      const data = await getProducts()

      setProducts(data) 
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Grocery Store
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  )
}