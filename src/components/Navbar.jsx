import React from "react";
import { Box, Flex, Text, IconButton, useColorModeValue, Avatar, Spinner, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FiHome, FiUser, FiPlusSquare, FiBell, FiUserCheck } from "react-icons/fi";
import ToggleDarkModeButton from "./ToggleDarkModeButton";

const Navbar = (props) => {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box bg={bg} color={color} boxShadow="md" px="4" mb="50px">
      <Flex h="16" alignItems="center" justifyContent={'space-between'}>
        <Flex ml="10px" alignItems={'center'}>
        <Text fontSize={['3.3vw', '3.3vw', '1.5vw', '1.5vw']} fontWeight="semibold">Connectify</Text>
          <Flex ml={'10px'}><ToggleDarkModeButton /></Flex>
        </Flex>
        {/* <Spacer /> */}
        <Flex alignItems="center" ml={"180px"} justifyContent={'center'}>
          <Link  to='/showpost' onClick={() => props.settoggle('showpost')}>
            <IconButton
              aria-label="Home"
              icon={<FiHome />}
              variant="ghost"
              size={['sm', 'sm', 'md', 'md']}
              isActive={props.toggle === 'showpost'}
            />
          </Link>
          <Link to='/showpeople' onClick={() => props.settoggle('showpeople')}>
            <IconButton
              aria-label="People"
              icon={<FiUser />}
              variant="ghost"
              size={['sm', 'sm', 'md', 'md']}
              isActive={props.toggle === 'showpeople'}
            />
          </Link>
          <Link to='/createpost' onClick={() => props.settoggle('createpost')}>
            <IconButton
              aria-label="Create Post"
              icon={<FiPlusSquare />}
              variant="ghost"
              size={['sm', 'sm', 'md', 'md']}
              isActive={props.toggle === 'createpost'}
            />
          </Link>
          <Link to='/getnotifications' onClick={() => props.settoggle('getnotifications')}>
            <IconButton
              aria-label="Notifications"
              icon={<FiBell />}
              variant="ghost"
              size={['sm', 'sm', 'md', 'md']}
              isActive={props.toggle === 'getnotifications'}
            />
          </Link>
          <Link to='/myprofile' onClick={() => props.settoggle('myprofile')}>
            <IconButton
              aria-label="My Profile"
              icon={<FiUserCheck />}
              variant="ghost"
              size={['sm', 'sm', 'md', 'md']}
              isActive={props.toggle === 'myprofile'}
            />
          </Link>
        </Flex>
        <Flex alignItems="center">
          <Text fontSize={['3.3vw', '3.3vw', '2vw', '1.5vw']} fontWeight="semibold" mr="30px">Welcome {props.name}</Text>
          {props.imageloader ? <Spinner /> : (
            props.avatar && props.avatar.url ? (
              <Avatar height={['44px', '46px', '46px', '50px']} name={props.name} src={props.avatar.url} />
            ) : (
              <Avatar name={props.name} />
            )
          )}

        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
