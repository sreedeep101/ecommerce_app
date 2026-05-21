import type { Product } from "../types/product"
import { Link } from "react-router-dom"


type Props = {
  product: Product
}

export default function ProductCard({
  product
}: Props) {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">

        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="h-52 w-full object-cover"
        />

        <div className="p-4">

          <h2 className="font-bold text-lg">
            {product.name}
          </h2>

          <p className="text-gray-500 text-sm mb-2">
            {product.category.name}
          </p>

          <div className="flex gap-2 items-center">

            <span className="font-bold text-xl">
              ₹{product.discountPrice || product.price}
            </span>

            {product.discountPrice && (

              <span className="line-through text-gray-400">

                ₹{product.price}

              </span>
            )}

          </div>

          <button
            className="bg-black text-white w-full mt-4 p-2 rounded-lg"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </Link>
  )
}