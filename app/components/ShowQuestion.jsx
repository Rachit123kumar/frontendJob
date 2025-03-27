"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../_lib/auth'
import { useRouter } from 'next/navigation'


export default  function ShowQuestion() {

const router=useRouter()
    const [data,setData]=useState([])
    const [pages,setPages]=useState(1)
    const [loading,setLoading]=useState(false);
    const [totalData,setTotalData]=useState(0)
    

    useEffect(()=>{

        async function loadAllNewestQuestion(){
            setLoading(true)
          const res=  await axios.get(`${url}/getAllLatesQuestion`,{page:pages})
          console.log(res.data.posts)
          setData([...data,...res.data.posts])
          setLoading(false)
          setTotalData(res.data.Total)
        }
        loadAllNewestQuestion()
    },[pages])

 
    




  return (
    <div className='mt-10'>
        <div>
            <p className='text-center font-bold text-xl'>Share your opinion and help someone</p>
        </div>


<div className='flex flex-col gap-y-2 mt-3 px-3 max-w-[800px] mx-auto'>
    {
        data && data.map((el,i)=>{
            return<div key={i} onClick={()=>router.push(`/question/${el._id}`)}>
                <div className='bg-green-400 w-full px-3 py-3 rounded-md text-bg-gray-400 font-bold cursor-pointer  '>

                
                {el.question}
            
            <p className='text-xs text-gray-500 mt-3'>created at &mdash; {el.createdAt}</p>
                
                    </div>
                
                </div>
        })
    }
</div>

<div className='flex items-center justify-center mt-3 cursor pointer'>
{
loading ? 
<button className="bg-black text-white px-3 py-2">Loading data</button>:
<button className="bg-black text-white px-3 py-2 disabled:bg-gray-300" onClick={()=>setPages(page=>page+1)}  disabled={totalData/5 <=pages}>Load more {pages}</button>
}

</div>

    </div>


  )
}
