import { Link } from "react-router-dom";
import {useState,useContext,useEffect} from 'react'
import signinProvider  from "../store/signinProvider";

export default function Registration(props){
    const [user,setuser]=useContext(signinProvider.Signin)
    const [fname,setfname]=useState()
    const [lname,setlname]=useState()
    const [username,setusername]=useState()
    const [password,setpassword]=useState()

    useEffect(() => {
        if (user && props.location) {
          props.history.push(props.location.state.prevPath);
        }
      }, [user, props.history, props.location])

    async function handlesubmit(e){
        e.preventDefault()
        await fetch('https://imdb-fullstack-app.herokuapp.com/user/register/',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                "first_name":fname,
                "last_name":lname,
                "username":username,
                "password":password
            })
        })
        resultSubmit()
}
        async function resultSubmit(){
        const response=await fetch('https://imdb-fullstack-app.herokuapp.com/user/login_user',{
            method:"POST",
            body:JSON.stringify({
                "username":username,
                "password":password
            }),
            headers:{
                'Content-Type':'application/json'
            },
        })
        const data=await response.json()
        setuser(data.data)
    }
    return (
        <>
            <Link to="/"><div className="back2Home container">Back To Home</div></Link>
            <br/>
            <div className="back2Home container">REGISTRATION</div>
            <div className="Registration container">
                <form onSubmit={handlesubmit}>
                    <input type='text' value={fname} onChange={(e)=>setfname(e.target.value)} placeholder='FIRST NAME'/>
                    <input type='text' value={lname}onChange={(e)=>setlname(e.target.value)} placeholder='LAST NAME'/>
                    <input type='text' value={username} onChange={(e)=>setusername(e.target.value)} placeholder='USER NAME'/>
                    <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='PASSWORD'/>
                    <button type="submit" >SUBMIT</button>
                </form>
            </div>

        </>
    )
}