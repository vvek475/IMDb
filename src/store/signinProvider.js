import {useState,createContext} from 'react'

export const Signin=createContext()
export default function Signinprovider({children}){
    const [user,setuser]=useState()
    return (
        <Signin.Provider value={[user,setuser]}> {children}</Signin.Provider>
    )
}