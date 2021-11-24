import {useState,createContext} from 'react'

const Signin=createContext()
function Signinprovider({children}){
    const [user,setuser]=useState()
    return (
        <Signin.Provider value={[user,setuser]}> {children}</Signin.Provider>
    )
}
const user_array={ Signin, Signinprovider }
export default user_array;