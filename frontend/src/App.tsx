import {
  Routes,
  Route,
} from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import ProtectedRoute from "./routes/ProtectedRoute"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminLayout from "./layouts/AdminLayouts"


function App() {

  return (

    <div>

      <Navbar />

      <Routes>


        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"

          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"

          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

        </Route>

      </Routes>

    </div>
  )
}

export default App