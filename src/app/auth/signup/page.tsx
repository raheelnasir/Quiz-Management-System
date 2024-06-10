import React from 'react'
import RootLayout from '@/app/layout'
import dynamic from 'next/dynamic'
import SignupPage from '../components/SignupPage'

const Signup: React.FC = () => {
    return (
        <SignupPage />
    )
}

export default dynamic(() => Promise.resolve(Signup), { ssr: false })
