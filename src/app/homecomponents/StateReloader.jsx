'use client'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { decryptObject } from '@/GlobalFunctions';
import Cookies from 'js-cookie';
const HomeHeader = () => {
    const { userAuth, setUserAuthData } = useContext(AuthContext)

    useEffect(() => {
        const encryptedUserAuth = Cookies.get('UserAuth');
        if (encryptedUserAuth) {
            const decryptedUserAuth = decryptObject(encryptedUserAuth);
            let parsedUserAuth;
            try {
                parsedUserAuth = JSON.parse(decryptedUserAuth);
            } catch (error) {
                parsedUserAuth = decryptedUserAuth;
            }
            setUserAuthData(parsedUserAuth);
        }
    }, []);
    return (
        <></>
    )
}

export default HomeHeader