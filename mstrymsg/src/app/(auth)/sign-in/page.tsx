'use client'

import { useSession } from "next-auth/react"

export default function Component(){
    const {data:session}=useSession();
    if (session) {
        return(
            <>
            Signed in as{session.user.email}<br/>
            <button onClick={()=>signOut()}>Sign-out</button>

            </>
        )
    }
    return <div>
        Not signed in<br/>
        <button onClick={()=>signIn()} className="bg-orange-500 px-3 py-1 m-4 rounded">Signin</button>
    </div>
}









