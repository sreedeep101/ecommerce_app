import axios from "axios"

const API = "http://localhost:3000"

const getHeaders = () => {

  const token = localStorage.getItem("token")

  return {

    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const getCart = async () => {

  const res = await axios.get(
    `${API}/cart`,
    getHeaders()
  )

  return res.data
}

export const addToCart = async (
  productId: number
) => {

  const res = await axios.post(

    `${API}/cart/add`,

    {
      productId,
      quantity: 1,
    },

    getHeaders()
  )

  return res.data
}

export const removeCartItem = async (
  itemId: number
) => {

  const res = await axios.delete(

    `${API}/cart/${itemId}`,

    getHeaders()
  )

  return res.data
}