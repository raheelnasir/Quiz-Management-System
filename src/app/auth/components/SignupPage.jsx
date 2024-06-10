'use client'
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './styles/signup.module.css';
import SignupAuth from './SignupAuth';
import { useRouter } from 'next/navigation'; // Import useRouter from 'next/router'
import { AuthContext } from '@/app/context/AuthContext';
import "../AuthPage.css"
const SignupPage = () => {
    const { userAuth } = useContext(AuthContext);
    const router = useRouter(); // Use useRouter here

    useEffect(() => {
        if (userAuth && userAuth.userRole.length > 0) {
            router.push('/quiz');
        }
    }, [userAuth, router]); // Add router to the dependencies array

    return (
        <>

            <div className="w-full  min-h-screen bg-base-200 py-4 flex items-center overflow-hidden justify-center">
                <div className="card m-auto login-card pt-0 shrink-0 w-full max-w-sm   bg-base-100">
                    <SignupAuth
                        postUrl={'https://localhost:7114/auth/createuser'}
                        typeName={'User'}
                    />


                </div>


            </div>
        </>
    );
};

export default dynamic(() => Promise.resolve(SignupPage), { ssr: false });
