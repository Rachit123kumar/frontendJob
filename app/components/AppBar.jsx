"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import axios from 'axios';
import { url } from '../_lib/auth';

export default function Login() {
  const router = useRouter()
  const { data, status } = useSession();
  const [userData,setUserData]=useState("")

  console.log(data?.user?.email)
  // This is them method to get the user details on the client component

  useEffect(() => {
    if (status == "loading") return

    if (status === "authenticated") {

      async function fetchData() {

        const user = await axios.post(`${url}/getUserByEmail`,{
          email:data?.user?.email
        })
        setUserData(user?.data?.user[0]?.userName)
        console.log(user?.data?.user[0]?.userName)

      }
      fetchData()

      

    }
    return



  }, [status])






  return (
    <div className='flex justify-between bg-green-400 px-3 py-2 items-center'>
      <p className='text-xl font-bold cursor-pointer' onClick={() => router.push("/")}>Forum</p>
      <div>



        {
          status === "authenticated" &&
          <div>

            <button className='px-3 py-2 bg-green-300 text-gray-600 hover:text-gray-900 rounded-md ' onClick={() => signOut()}>Logout</button>
           {!userData  ?<button className='px-3 py-2 bg-green-300 text-gray-600 hover:text-gray-900 rounded-md text-sm ml-3' onClick={()=>router.push("/setting")}>Create UserName</button>:  
           <button className='px-3 py-2 bg-green-300 text-gray-600 hover:text-gray-900 rounded-md text-sm ml-3' onClick={()=>router.push("/post")}>Ask Question</button> }
          </div>
        }

        {
          status === "unauthenticated" &&
          <button onClick={() => signIn()}>Login</button>
        }
        {
          status === "loading" &&
          <button onClick={() => signIn()}>loading</button>
        }

        {
          // JSON.stringify(session)
        }

      </div>
    </div>
  )
}
