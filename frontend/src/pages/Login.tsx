import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const data = await loginUser(
                email,
                password
            )

            localStorage.setItem(
                "token",
                data.token
            )

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            )

            alert("Login successful")

            navigate("/profile")

        } catch (err) {

            console.log(err)

            alert("Login failed")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="w-96 border p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-5">Login</h1>
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
                    onClick={handleLogin}
                    className="bg-black text-white w-full p-2 rounded"
                >
                    Login
                </button>

            </div>
        </div>
    )
}