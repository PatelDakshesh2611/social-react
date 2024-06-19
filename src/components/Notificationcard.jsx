import React, { useState } from "react";
import { Box, Flex, Avatar, Text, Button, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import swal from "sweetalert";

const Peoplecard = ({ user,id,setnoti,noti,getnotficaion }) => {
 
  const acceptreject=async(requestfor)=>{
    try{
      const friendid=user._id
    const datatosend={
      myid:id,
      friendid:user._id,
      requestfor
    }
   const res=await axios.post('https://socialmedia-node-84id.onrender.com/acceptorreject',datatosend)
   if(res.data.message=='ok'){
        const update=noti.filter((u)=>{
          return u._id!==friendid
        })
        setnoti(update)

   }else{
    swal('user not found')
    getnotficaion()
   }
    }catch(e){
      swal('Error occured at backend')
    }
  }
 
  const bg = useColorModeValue("white", "gray.800"); // The background color based on the color mode
  const color = useColorModeValue("gray.800", "white"); // The text color based on the color mode

  // A function to handle the follow button click
 

  return (
    <Box mb={'2vh'} bg={bg} color={color} w="full" maxW="700" p="4" boxShadow="md" borderRadius="md">
      <Flex alignItems="center" justifyContent='space-between'>
        <Flex alignItems="center">
          {user.avatar && user.avatar.url?<Avatar src={user.avatar.url} alt={user.name} />:<Avatar name={user.name} alt={user.name} />}
          <Text ml="4" fontWeight="bold">{user.name}</Text>
          {/* <Text>{user._id}</Text> */}
        </Flex>
        <Flex>
        <Button onClick={()=>{acceptreject('accept')}} colorScheme="blue" >
         Accept
      </Button>
      <Button ml={'10px'} colorScheme='red' onClick={()=>{acceptreject('reject')}}>Reject</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Peoplecard;

