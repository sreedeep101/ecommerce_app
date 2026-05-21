import {
  useEffect,
  useState,
} from "react"

import axios from "axios"

export default function AdminOrders() {

  const [orders, setOrders] =
    useState<any[]>([])

  useEffect(() => {

    fetchOrders()

  }, [])

  const fetchOrders = async () => {

    const token =
      localStorage.getItem("token")

    const res = await axios.get(

      "http://localhost:3000/orders/admin/all",

      {

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )

    setOrders(res.data)
  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Orders
      </h1>

      <div className="space-y-5">

        {orders.map((order) => (

          <div
            key={order.id}
            className="border rounded-xl p-5"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="font-bold">

                  Order #{order.id}

                </h2>

                <p>
                  {order.user.email}
                </p>

              </div>

              <div>

                ₹{order.totalAmount}

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}