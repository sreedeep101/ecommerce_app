export default function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  )

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-5">
        Profile
      </h1>

      <div className="border p-5 rounded-lg w-96">

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

      </div>

    </div>
  )
}