import {
  useEffect,
  useState,
} from "react"

import {
  getCart,
  removeCartItem,
} from "../services/cart"

import type { CartItem } from "../types/cart"
import { Link } from "react-router-dom"

export default function Cart() {

  const [cart, setCart] =
    useState<CartItem[]>([])

  const fetchCart = async () => {

    try {

      const data = await getCart()

      setCart(data.items)

    } catch (err) {

      console.log(err)
    }
  }

  useEffect(() => {

    fetchCart()

  }, [])

  const total = cart.reduce(

    (acc, item) => {

      return acc +
        (
          (item.product.discountPrice ||
            item.product.price)
          * item.quantity
        )
    },

    0
  )

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Cart
      </h1>

      <div className="space-y-5">

        {cart.map((item) => (

          <div
            key={item.product.id}
            className="border p-5 rounded-xl flex justify-between items-center"
          >

            <div className="flex gap-5 items-center">

              <img
                src={item.product.images[0]?.url}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />

              <div>

                <h2 className="font-bold">
                  {item.product.name}
                </h2>

                <p>
                  Qty: {item.quantity}
                </p>

              </div>

            </div>

            <div>

              <p className="font-bold text-xl mb-3">

                ₹{
                  (
                    item.product.discountPrice ||
                    item.product.price
                  ) * item.quantity
                }

              </p>

              <button

                onClick={async () => {

                  await removeCartItem(item.product.id)

                  await fetchCart()
                }}

                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

      <div className="mt-10 text-right">

        <h2 className="text-3xl font-bold">

          Total: ₹{total}

        </h2>

        <Link to="/checkout">

          <button
            className="bg-black text-white px-8 py-3 rounded-lg mt-5"
          >
            Proceed To Checkout
          </button>

        </Link>

      </div>

    </div>
  )
}