"use client"


import axios from 'axios'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { url } from '../_lib/auth'
import { useRouter } from 'next/navigation'









export default function Setting() {
  const [userName, setUserName] = useState("")
  const { data: userData, status } = useSession()
  console.log(userData?.user?.email)
  const router = useRouter()


// 1> Get All the post that has posted by pages

async function handleLogout(){
  signIn()

}


  async function checkIsAvailabeUserName() {
    if (status == "authenticated") {


      if (!userName) {
        toast("please enter a userName")
        return
      }

      try {
        const res = await axios.post(`${url}/checkUserName`, {
          userName,
          email: userData?.user?.email

        })

        const data = res.data


        toast(data.message)


      } catch (err) {
        console.log(err)
        toast("error while submitting data..")
      }

    }

    if (status == 'unauthenticated') {

      toast("please login")
      router.push("/")

    }





  }







  return (
    <div className='h-screen  bg-green-400'>
      <div className='flex justify-between px-3 py-2 '>
        <div className='px-3 py-2 bg-green-300 rounded-md cursor-pointer'>Forum</div>
        {
          status==="unauthenticated" &&  <div className='px-3 py-2 bg-green-300 rounded-md cursor-pointer' onClick={()=>handleLogout()}>Login</div>
        }
        {
          status=="authenticated" &&
        <div className='px-3 py-2 bg-green-300 rounded-md cursor-pointer' onClick={handleLogout}>Logout</div>
        }
        {
          status=="loading" &&
        <div className='px-3 py-2 bg-green-300 rounded-md cursor-pointer' >loading</div>
        }


      </div>

      <div className=' flex flex-col justify-center gap-x-3 items-center'>
        <div className=' flex justify-center gap-x-3 items-center'>

          <label> Username</label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter Your UserName ' className="w-[200px] bg-gray-400 px-3 py-2  rounded-md outline-none" />
        </div>
        <button className='bg-black px-3 py-2 text-white  mt-3 hover:bg-gray-900 cursor-pointer disabled:bg-gray-200' onClick={() => checkIsAvailabeUserName()} disabled={status == "loading"}>submit</button>
      </div>


    </div>
  )
}
