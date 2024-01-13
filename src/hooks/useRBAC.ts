import { ROLES } from "@/types/user"
import { auth } from "@clerk/nextjs"

const useRBAC = () => {
  const {sessionClaims} = auth()

  const isAdmin = sessionClaims?.metadata.role === ROLES.admin
  const isUser = sessionClaims?.metadata.role === ROLES.user

  return {isAdmin, isUser}
}

export default useRBAC