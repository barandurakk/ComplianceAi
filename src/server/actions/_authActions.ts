"use server";
 
import { ROLES } from "@/types/user";
import { clerkClient } from "@clerk/nextjs/server";
 
export const getRoleByUserId = async (userId?: string) => {

  if(!userId) return undefined

    try {

      const user = await clerkClient.users.getUser(userId)
      const role = user?.publicMetadata?.role as ROLES

      if(!role) return undefined

      return role
      
    } catch (err) {
      console.error(err)
      return undefined
    }
    
}
 
export const setDefaultRole = async (userId:string) => {
 
  try {
    const res = await clerkClient.users.updateUser(
      userId,
      {
        publicMetadata: { role: ROLES.user },
      }
    );
    return { message: res.publicMetadata };
  } catch (err) {
    console.error(err)
    return { message: err };
  }
}