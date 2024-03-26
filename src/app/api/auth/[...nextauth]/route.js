
import NextAuth, { getServerSession } from "next-auth"
import { options } from "./option"
import UserInfo from "@/server/UserInfo";


export async function isAdmin(){
  const session = await getServerSession(options);
  const userEmail = session?.user?.email;
  if(!userEmail){
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if(!userInfo){
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }