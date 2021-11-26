import {useState,useContext,useEffect} from 'react'

import  user_array  from '../../store/signinProvider'
export default function SignIn(props){
    const [,setuser] = useContext(user_array.Signin)
    const [username,setusername] = useState('')
    const [pwd,setpwd] = useState('')
    const [error,seterror]=useState()
    const [loading,setloading] = useState()
    const [signinvisibility,setsigninvisibility] = useState(false)
    // 'http://127.0.0.1:8000/user/login_user'
    useEffect(()=>{
        setsigninvisibility(false)
    },[props,error])
    async function handleSubmit(e){
        e.preventDefault()
        if (!username || !pwd){
            seterror('Please enter Username and Password')
        }
        setloading('Logging In .....')
        const response =await  fetch('https://movie-data-app5.herokuapp.com/user/login',{
            method:"POST",
            body:JSON.stringify({
                "username":username,
                "password":pwd
            }),
            headers:{
                'Content-Type':'application/json'
            },
        })
        setloading(undefined)
        const status=response.status
        if (status===200){
            const data=await response.json()
            setuser(data.data)
        }
        else{
            seterror(`Username doesn't match with password please
             check for uppercase and lowercase letters `)
            setsigninvisibility(false)
        }

    }

    return(
        <>
            {(error ||loading) && <div onClick={()=>seterror()} class={`error_block`}>{error}{loading}</div>}
        <div className={signinvisibility? 'signIn__div':props.className}>
            <form className="signIn__form" onSubmit={handleSubmit}>
                <h2>SIGNIN</h2>
            <input placeholder="NAME" value={username} onChange={(e)=>setusername(e.target.value)}/>
            <input placeholder="PASSWORD" type="password" value={pwd} onChange={(e)=>setpwd(e.target.value)}/>
            <button type="submit" onClick={()=>setsigninvisibility(true)}>SUBMIT</button> 
            </form>
        </div>
        </>
    )
}