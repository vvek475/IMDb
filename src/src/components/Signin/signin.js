import {useState} from 'react'
import { useContext } from 'react/cjs/react.development'
import { Signin } from '../../store/signinProvider'
export default function SignIn(props){
    const [,setuser] = useContext(Signin)
    const [username,setusername] = useState('')
    const [pwd,setpwd] = useState('')
    const [signinvisibility,setsigninvisibility] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        const response =await  fetch('http://127.0.0.1:8000/user/login_user',{
            method:"POST",
            body:JSON.stringify({
                "username":username,
                "password":pwd
            }),
            headers:{
                'Content-Type':'application/json'
            },
        })
        const data=await response.json()
        console.log(data.token)
        setuser(data)
        

    }

    return(
        <div className={signinvisibility? 'signIn__div':props.className}>
            <form className="signIn__form" onSubmit={handleSubmit}>
                <h2>Signin</h2>
            <input placeholder="Name" value={username} onChange={(e)=>setusername(e.target.value)}/>
            <input placeholder="password" type="password" value={pwd} onChange={(e)=>setpwd(e.target.value)}/>
            <button type="submit" onClick={()=>setsigninvisibility(true)}>Submit</button>
            </form>
        </div>
    )
}