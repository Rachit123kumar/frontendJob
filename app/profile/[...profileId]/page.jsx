"use client";
import { url } from '@/app/_lib/auth';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import AppBar from "../../components/AppBar"

export default function User() {
    // Erro in getting the user by username
    const router = useRouter();
    const params = useParams()
    const userName = decodeURIComponent(params.profileId[0])
    
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState("")
    const { data: userLoginData, status } = useSession()
    const [totalPosts, setTotalPosts] = useState("")
    const [profileUser, setProfileUser] = useState("")
    const [postByUser, setPostByUser] = useState("")
    const [error, setError] = useState("")
    const [copied,setCopied]=useState(false)

    //1) ab user ka data show karna hai 
    //2)  user apna question post karne ka functionality
    //3) anonymous user reply karne ka functionality
    //4) push notification system firebase
    // console.log(userLoginData,"=userLoginData", status,"status")
    console.log(userName)


function handleCopy(){
    const url=window.location.href
    navigator.clipboard.writeText(url).then(()=>{
        setCopied(true)

    })
}




    useEffect(() => {


        async function fetchUserDetail() {
            try {
                setLoading(true)
                const user = await axios.post(`${url}/getUserByUserName`, {
                    userName




                })

                if (user.data.message == "no user found") {
                    setError("Error Sorry no account related with this username ")
                }


                setData(user.data.user.user)
                setPostByUser(user.data.postByUser)

                // console.log(user.data.user.user.profileImage, "user")
                console.log(user.data.user.user.createdAt)
                setTotalPosts(user.data.TotalPostByUser)
                setProfileUser(user.data.user.user)
            } catch (err) {

            } finally {

            }


        }
        fetchUserDetail()
        setLoading(false)

    }, [])


    if (loading) {
        return <div>
            Data is Loading

        </div>
    }



    if (error) {
        return <div>
            <AppBar />

            <p className='text-xl font-bold text-center flex justify-center mt-10'>
                Sorry No accounts Found with this userName
            </p>
        </div>
    }

    return (
        <div>
            <div className='flex item-center max-w-screen bg-green-500 px-3 py-2 text-white justify-between items-center'>
                <p className='text-md font-bold cursor-pointer' onClick={() => router.push("/")}>
                    Forum</p>

                {
                    status === "unauthenticated" && <div>
                        <button className='cursor-pointer bg-green-400 px-3 py-2 rounded-md' onClick={() => signIn()}>Login</button>

                    </div>
                }
                {
                    status === "loading" && <button className='cursor-pointer bg-green-400 px-3 py-2 rounded-md'>Loading</button>
                }

                {
                    status === "authenticated" && <div>

                        {/* <button className='cursor-pointer bg-green-400 px-3 py-2 rounded-md'>{userLoginData.user.name}</button> */}
                        <button className='cursor-pointer bg-green-400 px-3 py-2 rounded-md' onClick={()=>router.push("/setting")}>Dashboard</button>

                        <button className='cursor-pointer ml-3 bg-red-400 text-black px-3 py-2 rounded-md' onClick={() => router.push("/post")}>Ask Question</button>

                    </div>
                }






            </div>
            {/* {
                data && data?.profileImage &&
                <div>
                    <img src={data.profileImage} alt="user Profile Image" height="64px" width={"64px"} />




                </div>
            } */}

            <div className=' bg-green-300 flex items-center flex-col'>
                <div className='flex  items-center gap-x-2'>

                <p className='text-center'>{profileUser.name}</p>
                <svg onClick={()=>handleCopy()}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />

</svg>
<span>{copied ? "copied":"copy url"}</span>
                </div>

                <p className='text-center text-red-800 font-bold '>Joined since {profileUser.createdAt}</p>
                <p className="text-center font-md ">Total Question he has posted - {totalPosts}</p>



            </div>

            {/* show all the question he has posted  */}
            <div className='flex flex-col gap-y-2 max-w-[800px] mx-auto mt-10'>


                {
                    postByUser.length > 0 && postByUser.map((el, i) => {
                        return <div key={i} className='bg-green-400 px-3 py-2 cursor-pointer' onClick={() => router.push(`/question/${el._id}`)}>
                            {
                                el.question
                            }
                        </div>
                    })
                }




                <div className='flex items-center justify-center'>

                    <button className='bg-black text-white px-3 py-2  cursor-pointer w-[200px]'>Load More Data</button>
                </div>
            </div>


        </div>
    )
}
