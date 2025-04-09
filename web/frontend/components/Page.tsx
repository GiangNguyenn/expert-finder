import SignOutButton from './SignOutButton'
import { useSession } from 'next-auth/react'
import jwt_decode from "jwt-decode";



export const Page = () => {
  const { data: session } = useSession()

  // decode the session token to get user data
  const user = session ? session.user : null

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <SignOutButton />
        </div>
      </div>
    </>
  )
}