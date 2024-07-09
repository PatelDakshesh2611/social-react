import React from 'react';
import { Box, Flex, IconButton, Avatar, Spinner, Text, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends, FaPlusSquare, FaBell, FaUser } from 'react-icons/fa';
import ToggleDarkModeButton from './ToggleDarkModeButton';

const BottomNavbar = ({ toggle, settoggle, imageloader, avatar, name }) => {
  const navigate = useNavigate();
  const {colorMode}=useColorMode();
  
  const handleNavigation = (path, value) => {
    settoggle(value);
    navigate(path);
  };

  return (
    <Box  position="fixed" bottom="0" width="100%" bg="white" boxShadow="md" zIndex="1000">
      <Flex backgroundColor={colorMode=='dark'?'black':''} justify="space-around" align="center" h="60px">
        <IconButton
          icon={<FaHome />}
          aria-label="Home"
          variant="ghost"
          isActive={toggle === 'showpost'}
          onClick={() => handleNavigation('/showpost', 'showpost')}
        />
        <IconButton
          icon={<FaUserFriends />}
          aria-label="People"
          variant="ghost"
          isActive={toggle === 'showpeople'}
          onClick={() => handleNavigation('/showpeople', 'showpeople')}
        />
        <IconButton
          icon={<FaPlusSquare />}
          aria-label="Create Post"
          variant="ghost"
          isActive={toggle === 'createpost'}
          onClick={() => handleNavigation('/createpost', 'createpost')}
        />
        <IconButton
          icon={<FaBell />}
          aria-label="Notifications"
          variant="ghost"
          isActive={toggle === 'getnotifications'}
          onClick={() => handleNavigation('/getnotifications', 'getnotifications')}
        />
       <Flex>
       <Flex align="center" onClick={() => handleNavigation('/myprofile', 'myprofile')} cursor="pointer">
          {imageloader ? <Spinner /> : <Avatar w={'27px'} h={'27px'} name={name} src={avatar?.url} />}          
        </Flex>
          <Flex ml={'6px'}><ToggleDarkModeButton/></Flex>
       </Flex>
      </Flex>
    </Box>
  );
};

export default BottomNavbar;
