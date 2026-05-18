import { useState } from "react"
import axios from "axios"

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {

    try {

      const res = await axios.post(
        "http://localhost:3000/auth/register",
        {
          name,
          email,
          password
        }
      )

      console.log(res.data)

      alert("User Registered")

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-96 border p-6 rounded-lg">

        <h1 className="text-2xl font-bold mb-5">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="border w-full p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-black text-white w-full p-2 rounded"
        >
          Register
        </button>

      </div>

    </div>
  )
}