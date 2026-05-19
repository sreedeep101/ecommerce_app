import axios from "axios"

const API = "http://localhost:3000"

export const loginUser = async (
  email: string,
  password: string
) => {

  const res = await axios.post(
    `${API}/auth/login`,
    {
      email,
      password,
    }
  )

  return res.data
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {

  const res = await axios.post(
    `${API}/auth/register`,
    {
      name,
      email,
      password,
    }
  )

  return res.data
}

export const getCurrentUser = async () => {

  const token = localStorage.getItem("token")

  const res = await axios.get(
    `${API}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}