'use client'
import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import LoginAuth from './LoginAuth'
import { AuthContext, AuthProvider } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
const LoginPage = () => {

    const { userAuth } = useContext(AuthContext);
    const move = useRouter();
    useEffect(() => {
        if (userAuth && userAuth.uId) {
            move.push("/")
        }
    }, [userAuth])
    return (
        <>

            <div className=" login-card  w-80 m-auto max-w-lg shadow-2xl  ">

                <LoginAuth
                    loginUrl={"https://localhost:7114/auth/loginuser"} typeName='User'
                />
            </div>

        </>
    )
}


export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })
