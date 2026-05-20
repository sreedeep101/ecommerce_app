import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {

  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  )

  const logout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    navigate("/login")
  }

  return (

    <div className="bg-black text-white p-4 flex justify-between">

      <Link to="/">
        Store
      </Link>

      <div className="flex gap-5">

        {!user ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>

            <Link to="/cart">
              Cart
            </Link>
            
            <Link to="/profile">
              Profile
            </Link>

            <button onClick={logout}>
              Logout
            </button>
          </>
        )}

      </div>

    </div>
  )
}