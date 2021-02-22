import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Login } from '../auth/Login';
import { MainUI } from './MainUI';

export const StarteUI = () => {

    const { user, authUser } = useSelector( state => state.auth );
    const [ authUserXP, setAuthUserXP ] = useState(false);


    useEffect(() => {
        console.log('user:', user);
        if( user !== null) {
            setAuthUserXP(true);
        }
    }, 1000);

    console.log('authUser:', authUser);

    return (
        <>
          {
              authUserXP
              ? <MainUI />
              : <Login />
          }  
        </>
    )
}
