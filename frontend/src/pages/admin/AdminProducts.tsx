import {
  useEffect,
  useState,
} from "react"

import axios from "axios"

export default function AdminProducts() {

  const [products, setProducts] =
    useState<any[]>([])

  const [name, setName] =
    useState("")

  const [price, setPrice] =
    useState("")

  const fetchProducts = async () => {

    const res = await axios.get(
      "http://localhost:3000/products"
    )

    setProducts(res.data)
  }

  useEffect(() => {

    fetchProducts()

  }, [])

  const createProduct = async () => {

    const token =
      localStorage.getItem("token")

    await axios.post(

      "http://localhost:3000/products",

      {

        name,

        description: "Admin Product",

        price: Number(price),

        stock: 10,

        sku: Date.now().toString(),

        categoryId: 1,

        images: [
          "https://images.unsplash.com/photo-1542838132-92c53300491e"
        ],
      },

      {

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )

    fetchProducts()
  }

  const deleteProduct = async (
    id: number
  ) => {

    const token =
      localStorage.getItem("token")

    await axios.delete(

      `http://localhost:3000/products/${id}`,

      {

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )

    fetchProducts()
  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Products
      </h1>

      <div className="border p-5 rounded-xl mb-10">

        <h2 className="font-bold text-xl mb-4">
          Create Product
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Product Name"
            className="border p-3 w-full"
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 w-full"
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <button

            onClick={createProduct}

            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Create
          </button>

        </div>

      </div>

      <div className="space-y-4">

        {products.map((product) => (

          <div
            key={product.id}
            className="border p-5 rounded-xl flex justify-between"
          >

            <div>

              <h2 className="font-bold">
                {product.name}
              </h2>

              <p>
                ₹{product.price}
              </p>

            </div>

            <button

              onClick={() =>
                deleteProduct(product.id)
              }

              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}