import React, {  useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Allroutes from './components/Allroutes'
import { useNavigate } from 'react-router-dom'
import BottomNavbar from './components/BottomNavbar'
import { useBreakpointValue } from '@chakra-ui/react';
const App = () => {
  const nav=useNavigate()
  const [id,setid]=useState('')
  const [toggle,settoggle]=useState('showpost')
  const settoogle=(value)=>{
    settoggle(value)
    localStorage.setItem('toggle',value)
  }

  // Api connection string
  const connectionString="https://socialmedia-node-84id.onrender.com"

  // http://localhost:4000
  // https://socialmedia-node-84id.onrender.com
  const [usersdata,setudata]=useState({
    _id:'',
    name:'',
    avatar:{
     
    },
  })
  const checker=()=>{
    if(localStorage.getItem('id') && localStorage.getItem('userdata')){
      setudata(JSON.parse(localStorage.getItem('userdata')))      
      setid(localStorage.getItem('id'))
      if(localStorage.getItem('toggle')){
        settoggle(localStorage.getItem('toggle'))
        nav(`/${localStorage.getItem('toggle')}`)
      }
    }
  }
  const NavbarComponent = useBreakpointValue({
    base: BottomNavbar,
    md: BottomNavbar,
    lg: Navbar,
  });
 useEffect(()=>{
   checker()
 },[])
const [imageloader,setimageloader]=useState(0)
  return (
    <div>  
    {id && NavbarComponent && (
        <NavbarComponent
          toggle={toggle}
          settoggle={settoogle}
          imageloader={imageloader}
          avatar={usersdata.avatar}
          name={usersdata.name}
        />
      )}   
      <Allroutes connectionString={connectionString} id={id} imageloader={imageloader} setimageloader={setimageloader} setid={setid} usersdata={usersdata} setudata={setudata}></Allroutes>
    </div>
  )
}

export default App
