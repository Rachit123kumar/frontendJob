import { getServerSession } from 'next-auth'
import React from 'react'
import { NEXT_AUTH } from '../_lib/auth';

export default async function User() {
  
    const session=await getServerSession(NEXT_AUTH);
  return (
    <div>User


    {
       session && JSON.stringify(session)
    }
    </div>
  )
}
