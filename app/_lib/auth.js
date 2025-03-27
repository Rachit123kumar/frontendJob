import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google"
import { signIn } from 'next-auth/react';

// export const url="http://3.95.151.170:3001"
export const url="https://sumserver.learngames.shop"
// export const url="http://localhost:3001"
export const NEXT_AUTH = {
  providers: [
    // CredentialsProvider({
    //     name: "Email",
    //     credentials: {
    //         username: { label: "email", type: "text", placeholder: "email" },
    //         password: { label: "password", type: "text", placeholder: "email" }
    //     },
    //     async authorize(credentials) {

    //         console.log("SECRET", process.env.NEXTAUTH_SECRET);
    //         // validation
    //         console.log(credentials)
    //         return {
    //             id: "user1",
    //             username: "bittu kumar",
    //             name: "bittu kumar"

    //         }
    //         // const username=credentials.username;
    //         // const password=credentials.password;
    //         // const user=await db.findOne({
    //         //     wher user:""
    //         // })
    //         // if(!user){
    //         //     return null;
    //         // }




    //         return {
    //             username: user.id,
    //             email: user.email
    //         }
    //     }
    // }

    // ),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })

  ],
  secret:  process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async jwt({ token, user }) {
    //   console.log("token", token)
    //   token.userId = token.sub
    //   // sub==googleId
    //   // console.log("user", user)
    //   // name email picture sub=googleId, 

    //   return token
    // },



//##
//##SignIN callback ko use karna hai database mein data to insert karne k liye
//##
//##
//##






    async session({ session, token, user }) {
      // session.userId = token.sub
  



      // console.log(session)
      session.googleId=token.sub
      return session
    },
    async signIn({user,account,profile}){
      const {name,email,picture,sub}=profile;


      const res=  await axios.post((`${url}/createUser`),{
        googleId:sub,
        name:name,
        email:email,
        profileImage:picture

      })
      console.log(res)
     
      
      // console.log("profile",profile)
      console.log(res)

      return true
    }


  }
}