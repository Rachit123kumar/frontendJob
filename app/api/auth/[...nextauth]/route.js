import { NEXT_AUTH } from "@/app/_lib/auth"
import NextAuth from "next-auth"

import { NextResponse } from "next/server"

const handler = NextAuth(NEXT_AUTH)

export { handler as GET, handler as POST }


// export { handler as GET, handler as POST }

// export function GET(req){
//     return NextResponse.json({
//         message:"Handler"
//     })

// }