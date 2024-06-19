import React from 'react'
import { Outlet } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import Register from './Register'
const Protectedroutes = (props) => {
    const useAuth = () =>{

        if(props.id && props.data){
            return true
        }else{
            return false
        }
    
       
}
  return (
   useAuth()?<Outlet/>:<Text as={'bold'} fontSize={'larger'}>Please do signup or login first</Text>
  )
}

export default Protectedroutes
