import React, { useState } from "react";
import { Box, Flex, Spacer, Text, IconButton, useColorModeValue,Avatar, Spinner } from "@chakra-ui/react";
import './navbar.css'
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon  } from "@chakra-ui/icons";

const Navbar = (props) => {
  
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <div>
    <Box  bg={bg} color={color} boxShadow="md" px="4" mb={'50px'}>
      <Flex h="16" alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">Connectify By Dakshesh</Text>
        <Spacer />
        <Flex alignItems="center">
          {/* <IconButton aria-label="Toggle color mode" icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} mr="4" /> */}
          <Text fontWeight={'bold'} mr={'30px'}>Welcome {props.name}</Text>
         {
          props.imageloader?<Spinner></Spinner>:<>
           {
            props.avatar && props.avatar.url? <>
            <Avatar name={props.name} src={props.avatar.url}></Avatar>
            </>:<>
            <Avatar name={props.name} ></Avatar>
            </>
          }</>
         }
         
          <IconButton aria-label="Toggle menu" icon={show ? <CloseIcon /> : <HamburgerIcon />} onClick={toggleMenu} />
        </Flex>
      </Flex>
      {show && (
        <Box zIndex={'1000'} py="4" display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Link onClick={()=>{props.settoggle('showpost')}} to='/showpost'><Text className={props.toggle==='showpost'?'navtext line':'navtext'}>Home</Text></Link>
          <Link onClick={()=>{props.settoggle('showpeople')}} to='/showpeople'> <Text className={props.toggle==='showpeople'?'navtext line':'navtext'}>People</Text> </Link>
          <Link onClick={()=>{props.settoggle('createpost')}} to='/createpost'><Text  className={props.toggle==='createpost'?'navtext line':'navtext'}>Create post</Text></Link>
          <Link onClick={()=>{props.settoggle('getnotifications')}} to='/getnotifications'> <Text className={props.toggle==='getnotifications'?'navtext line':'navtext'}>Friend requests</Text> </Link>
          <Link onClick={()=>{props.settoggle('myprofile')}} to='/myprofile'> <Text className={props.toggle==='myprofile'?'navtext line':'navtext'}>Myprofile</Text> </Link>
          
        </Box>
      )}
    </Box>
    </div>
    
  );
};

export default Navbar;
