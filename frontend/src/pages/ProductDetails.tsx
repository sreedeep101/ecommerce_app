import {
    useEffect,
    useState,
} from "react"

import {
    useParams,
} from "react-router-dom"

import {
    getProductById,
} from "../services/products"

import type { Product } from "../types/product"
import { addToCart } from "../services/cart"

export default function ProductDetails() {

    const { id } = useParams()

    const [product, setProduct] =
        useState<Product | null>(null)

    useEffect(() => {

        if (id) {
            fetchProduct()
        }

    }, [id])

    const fetchProduct = async () => {

        try {

            const data = await getProductById(id!)

            setProduct(data)

        } catch (err) {

            console.log(err)
        }
    }

    if (!product) {

        return (
            <div className="p-10">
                Loading...
            </div>
        )
    }

    return (

        <div className="p-10">

            <div className="grid grid-cols-2 gap-10">

                <div>

                    <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full rounded-xl"
                    />

                </div>

                <div>

                    <h1 className="text-4xl font-bold mb-4">
                        {product.name}
                    </h1>

                    <p className="text-gray-500 mb-4">
                        {product.category.name}
                    </p>

                    <div className="flex gap-3 items-center mb-6">

                        <span className="text-3xl font-bold">
                            ₹{product.discountPrice || product.price}
                        </span>

                        {product.discountPrice && (

                            <span className="line-through text-gray-400">

                                ₹{product.price}

                            </span>
                        )}

                    </div>

                    <p className="mb-6">
                        {product.description}
                    </p>

                    <button
                        className="bg-black text-white px-8 py-3 rounded-lg"
                        onClick={async () => {

                            try {

                                await addToCart(product.id)

                                alert("Added to cart")

                            } catch (err) {

                                alert("Please login first")
                            }
                        }}

                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    )
}