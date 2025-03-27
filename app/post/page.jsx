"use client"
import axios from 'axios';
import { useSession,signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { url } from '../_lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function page() {
    const router=useRouter()
    const [question, setQuestion] = useState("");
    const {data,status}=useSession()
    



    console.log(data);


// 1 Check the user is login
// User can set the posted by anonymous


async function createPost(){

const res=    await axios.post(`${url}/createPost`,{
        email:data.user.email,

        question,

    })

    toast("Your question has been posted.")
    router.push("/")

    console.log(res)
    // Redirect the user to the new Post Page 
    // Give them a toast of sucess message that they have 
   

}




    






    return (
        <div className='max-w-[1200px] mx-auto'>

            <div className='flex h-screen flex-col px-3 py-2'>
                <h2 className='text-xl font-lg font-bold'>

                    Post Your Question and Get Public Opinions
                </h2>
                <div className='bg-gray-0' >

                    <textarea
                    value={question} onChange={(e)=>setQuestion(e.target.value)}
                        className='border-none outline-none bg-gray-300 py-3 px-5 rounded-md w-full h-full'
                        type="text"
                        placeholder="Ask the question"

                    />
               { status =="unauthenticated" &&    <button onClick={()=>signIn()} className='      cursor-pointer text-cente bg-black px-3 py-2 text-white  rounded-md mt-3'>
                        Login
                    </button>}
                   {status==="loading" && <button className='cursor-pointer text-cente bg-black px-3 py-2 text-white  rounded-md mt-3'>
                        Loading
                    </button>}
                    { status ==="authenticated" &&  <button onClick={()=>createPost()} className='cursor-pointer text-cente bg-black px-3 py-2 text-white  rounded-md mt-3'>
                        Submit
                    </button>}
                </div>

            </div>

        </div>


    )
}
