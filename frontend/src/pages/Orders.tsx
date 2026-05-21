import {
  useEffect,
  useState,
} from "react"

import {
  getOrders,
} from "../services/orders"

export default function Orders() {

  const [orders, setOrders] =
    useState<any[]>([])

  useEffect(() => {

    fetchOrders()

  }, [])

  const fetchOrders = async () => {

    try {

      const data = await getOrders()

      setOrders(data)

    } catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="border rounded-xl p-5"
          >

            <div className="flex justify-between mb-5">

              <div>

                <h2 className="font-bold text-xl">

                  Order #{order.id}

                </h2>

                <p>
                  {order.status}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold">

                  ₹{order.totalAmount}

                </p>

              </div>

            </div>

            <div className="space-y-3">

              {order.items.map((item: any) => (

                <div
                  key={item.id}
                  className="flex gap-4 items-center"
                >

                  <img
                    src={
                      item.product.images[0]?.url
                    }
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>

                    <h3 className="font-bold">

                      {item.product.name}

                    </h3>

                    <p>
                      Qty: {item.quantity}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}