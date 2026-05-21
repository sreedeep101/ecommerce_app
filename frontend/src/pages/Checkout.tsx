import {
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import {
  createOrder,
} from "../services/orders"

export default function Checkout() {

  const navigate = useNavigate()

  const [address, setAddress] =
    useState("")

  const [city, setCity] =
    useState("")

  const [postalCode, setPostalCode] =
    useState("")

  const [phoneNumber, setPhoneNumber] =
    useState("")

  const handleCheckout = async () => {

    try {

      await createOrder({

        address,
        city,
        postalCode,
        phoneNumber,
      })

      alert("Order placed successfully")

      navigate("/orders")

    } catch (err) {

      console.log(err)

      alert("Checkout failed")
    }
  }

  return (

    <div className="p-10 max-w-xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Address"
          className="border p-3 w-full"
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="City"
          className="border p-3 w-full"
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Postal Code"
          className="border p-3 w-full"
          onChange={(e) =>
            setPostalCode(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="border p-3 w-full"
          onChange={(e) =>
            setPhoneNumber(e.target.value)
          }
        />

        <button

          onClick={handleCheckout}

          className="bg-black text-white w-full p-3 rounded-lg"
        >
          Place Order
        </button>

      </div>

    </div>
  )
}