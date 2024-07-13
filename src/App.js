import React, {  useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Allroutes from './components/Allroutes'
import { useNavigate } from 'react-router-dom'
import BottomNavbar from './components/BottomNavbar'
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons'
const App = () => {
  const nav=useNavigate()
  const [id,setid]=useState('')
  const [toggle,settoggle]=useState('showpost')
  const settoogle=(value)=>{
    settoggle(value)
    localStorage.setItem('toggle',value)
  }
  const isChatIconVisible = useBreakpointValue({ base: true, md: true, lg: false });

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

  const handleChatClick = () => {
   nav('/chat')
  };
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
      {id && isChatIconVisible && (
        <Box position="fixed" bottom="120px" right="16px">
          <IconButton
            icon={<ChatIcon />}
            colorScheme="teal"
            borderRadius="full"
            size="lg"
            onClick={handleChatClick}
            aria-label="Open Chat"
          />
        </Box>
      )}
    </div>
  )
}

export default App
