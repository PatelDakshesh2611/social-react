import React, { useEffect, useState } from 'react'
import './register.css'
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
const Register = (props) => {
const nav=useNavigate()
useEffect(()=>{
  props.setid('')
})
const [spinner,setspinner]=useState(0)
const[spinner2,setspinner2]=useState(0)
//Form Data
const [formdata,setformdata]=useState({
  name:'',
  email:'',
  password:''
})
//Login Data
const[logindata,setlogin]=useState({
  email:'',
  password:''
})
//signup handling
const handleregister=async(e)=>{
   e.preventDefault()
   const emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
   if(formdata.email && formdata.password && formdata.name){
       if(emailregex.test(formdata.email)){
          if(formdata.password.length<6){
            swal('Password must be more than 6 characters')
          }
          else{
             try{
              setspinner(1)
              const res=await axios.post(`${props.connection}/register`,formdata)
              if(res.data.message==="loggeinuser"){
                swal("you're already a loggedin user")
              }
              else{
              props.setid(res.data.data._id)
              props.setudata(res.data.data)
              localStorage.setItem('id',res.data.data._id)
              const data={
                avatar:res.data.data.avatar,
                name:res.data.data.name,
                _id:res.data.data._id
              }
              localStorage.setItem('userdata',JSON.stringify(data))
              
              nav('/showpost')
              }
              setspinner(0)
             }
             catch(e){
              console.log(e);
             swal('Error occured at backend')
             setspinner(0)
             }
          }
       }
       else{
        swal('Email is not in a proper format')
       }
   }
   else{
    swal('All data must be necessary')
   }
  }

//handling user's login

const handlelogin=async(e)=>{
  const emailregex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
  e.preventDefault()
  if(logindata.email && logindata.password){
     if(emailregex.test(logindata.email)){
      if(logindata.password.length<6){
        swal('Password must be more than 6 characters')
      }
      else{
        try{
          setspinner2(1)
          const res=await axios.post(`${props.connection}/login`,logindata)
          if(res.data.message==='not a user'){
            swal("you're not a valid user or check your email password again")
            setspinner2(0)
          }
          else{
            props.setid(res.data.data._id)
            props.setudata(res.data.data)
            localStorage.setItem('id',res.data.data._id)
            console.log(res.data.data)
            const data={
              avatar:res.data.data.avatar,
              name:res.data.data.name,
              _id:res.data.data._id
            }
            localStorage.setItem('userdata',JSON.stringify(data))
            nav('/showpost')
            setspinner2(0)
          }
        }
        catch(e){
           swal('error occured at backend')
           setspinner2(0)
        }
      }
     }
     else{
      swal('Email is not in a proper format')
     }
  }
  else{
    swal('All data must be necessary')
  }
}

  return (
    <div className='body'>
     <>
  <h1 style={{position:'absolute',marginBottom:'70vh',color:'#573b8a',fontSize:'20px'}}>Welcome to Connectify by Dakshesh</h1>
  <link rel="stylesheet" type="text/css" href="slide navbar style.css" />
  <link
    href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap"
    rel="stylesheet"
  />
  <div className="main">
    <input className='input' type="checkbox" id="chk" aria-hidden="true" />
    <div className="signup">
      <form>
        <label htmlFor="chk" aria-hidden="true">
          Sign up
        </label>
        <input onChange={(e)=>{setformdata({...formdata,name:e.target.value})}} className='input' type="text" name="txt" placeholder="Name" required="" />
        <input onChange={(e)=>{setformdata({...formdata,email:e.target.value})}} className='input' type="email" name="email" placeholder="Email" required="" />
        <input onChange={(e)=>{setformdata({...formdata,password:e.target.value})}} className='input' type="password" name="pswd" placeholder="Password" required="" />
        {
          spinner?<button onClick={(e)=>{handleregister(e)}} className='button'><Spinner/></button>:
          <button onClick={(e)=>{handleregister(e)}} className='button'>Sign up</button>
        }
      </form>
    </div>
    <div className="login">
      <form>
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <input onChange={(e)=>{setlogin({...logindata,email:e.target.value})}} className='input' type="email" name="email" placeholder="Email" required="" />
        <input onChange={(e)=>{setlogin({...logindata,password:e.target.value})}} className='input' type="password" name="pswd" placeholder="Password" required="" />
        {
          spinner2?<button onClick={(e)=>{handlelogin(e)}} className='button'><Spinner/></button>:<button onClick={(e)=>{handlelogin(e)}} className='button'>Login</button>
        }
      </form>
    </div>
  </div>
</>

    </div>
  )
}

export default Register
