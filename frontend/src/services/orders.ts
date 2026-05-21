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

export const createOrder = async (
  data: any
) => {

  const res = await axios.post(

    `${API}/orders`,

    data,

    getHeaders()
  )

  return res.data
}

export const getOrders = async () => {

  const res = await axios.get(
    `${API}/orders`,
    getHeaders()
  )

  return res.data
}