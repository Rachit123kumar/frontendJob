"use client";
import { url } from '@/app/_lib/auth';
import  Login  from '../../components/AppBar';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {
    const inputRef = useRef(null);
  const [copied, setCopied] = useState(false);
    const params = useParams()
    const router = useRouter()
    const questionId = params.questionId[0]

    console.log(questionId)
    const [questionData, setQuestionData] = useState("");
    const [data, setData] = useState("")
    const [owner, setOwner] = useState("")

    const [replies, setReplies] = useState([])
    const [loading, setLoading] = useState(false);
    const [opini, setOpini] = useState("")
    const [submittingOpinion, setSubmittingOpinon] = useState(false)
    const [error, setError] = useState("")


    // 1 Get The Question Information 
    // Get the owner information if it is not private
    // Now anyone can reply to this question 
    // If there is  a typo in id of question i have to resolve that


    const handleCopyUrl = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // reset after 2s
        });
      };


    async function submitAnswer() {
        setSubmittingOpinon(true)
        console.log(opini)

        if (!opini) {
            alert("please give me your opinion")
            return
        }
        try {
            const res = await axios.post(`${url}/sendOpinion`, {
                postId: questionId,
                content: opini
            })


            setReplies([res.data.reply, ...replies])
            toast("sucessfully opinion submitted")
            setOpini("")
            console.log(res)
            setSubmittingOpinon(false)
            router.push("/")

        } catch (err) {


            setError("Error while fetchng Data")
        }


    }



    useEffect(() => {


        async function fetchQuestionDetails() {
            try {

                setLoading(true)
                const res = await axios.get(`${url}/getQuestionInformationById`, {
                    params: { id: questionId },
                });

                setQuestionData(res.data.data.question)
                setOwner(res.data.owner)
                setReplies(res.data.reply)
                console.log(res.data.owner)
            } catch {


                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        fetchQuestionDetails()
    }, [])





    if (loading) {
        return <div>
            Loading
        </div>
    }


    return (<div>

            <Login/>
        <div className='max-w-[800px] mx-auto'>

            Question Page I will the specific question and their replies


            {
                questionData && <div className='bg-green-500 px-3 py-2  rounded-sm  '>

                    {questionData.question}
                    <div className='flex justify-between items-center mt-3 cursor-pointer'>

                        <span className=' text-xs font-semibold  bg-green-300 px-3 py-1 rounded-md ' onClick={() => { router.push(`/profile/${owner.userName}`) }}>{owner.name}</span>
                        <div className='flex '>
                        <span onClick={handleCopyUrl} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                        <span className='text-xs'>{copied ? "Copied!" : "Copy URL"}</span>
                        </span>
                            </div>

                    </div>
                </div>
            }

            <div>

                <div className=' mt-3  bg-gray-300 rounded px-3 py-2'>
                    <textarea placeholder='Give your opinion' value={opini} onChange={(e) => setOpini(e.target.value)} className="w-full outline-none border-none" />



                </div>

                <button className='mt-3 bg-black px-3 py-2 text-white' onClick={() => submitAnswer()} disabled={submittingOpinion}>Submit </button>
            </div>

            <div className='flex flex-col max-w-[800px]  gap-y-2 rounded-sm mt-10'>

                <span className='text-center text-xl bg-gray-300 '>All replies are below</span>

                {
                    replies.length > 0 && replies.map((el, i) => {
                        const formattedDate = el.createdAt
                            ? new Date(el.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : "Unknown Date";

                        return (
                            <div className='px-3 py-2 bg-gray-300 rounded-sm' key={i}>
                                {el.content}
                                <div>
                                    <span className='text-xs'>{formattedDate}</span>
                                </div>
                            </div>
                        );
                    })
                }

            </div>


        </div>
    </div>

    )
}
