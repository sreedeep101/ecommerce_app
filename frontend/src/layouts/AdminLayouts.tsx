import {
  Link,
  Outlet,
} from "react-router-dom"

export default function AdminLayout() {

  return (

    <div className="flex min-h-screen">

      <aside
        className="w-64 bg-black text-white p-5"
      >

        <h1 className="text-2xl font-bold mb-10">
          Admin
        </h1>

        <div className="space-y-4">

          <Link
            to="/admin/products"
            className="block"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="block"
          >
            Orders
          </Link>

        </div>

      </aside>

      <main className="flex-1 p-10">

        <Outlet />

      </main>

    </div>
  )
}