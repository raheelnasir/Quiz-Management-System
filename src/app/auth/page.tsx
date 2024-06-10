import React from 'react';
import dynamic from "next/dynamic";
import LoginPage from './components/LoginPage';
import "./AuthPage.css"
const AuthPage = () => {
    return (
        <div className='min-h-screen m-auto flex  bg-base-200'>
            <div className="card overflow-hidden  align-items-center m-auto   pt-0 shrink-0   " style={{ maxWidth: "max-content", maxHeight: "max-content" }}>
                <LoginPage />
            </div>


        </div>
    );
}

export default dynamic(() => Promise.resolve(AuthPage), { ssr: false })
