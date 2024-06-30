import React, { useState } from "react";
import { Box, Flex, Avatar, Text, Button, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import axios from "axios";
import swal from "sweetalert";

const Peoplecard = ({ user, id, status, getpeople, connection }) => {
  const [followallow, setfollowallow] = useState(status);
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const textSize = useBreakpointValue({ base: "sm", md: "md" });

  const handleFollow = async () => {
    try {
      const datatosend = {
        followid: user._id,
        myid: id
      };
      const res = await axios.post(`${connection}/followandunfollow`, datatosend);
      if (res.data.message === 'requestsent' || res.data.message === 'alreadyrequested') {
        setfollowallow('requestedbyyou');
      } else {
        swal('Sorry user not found');
      }
    } catch (e) {
      swal('Error occured at backend');
      getpeople();
    }
  };

  return (
    <Box mb="2vh" bg={bg} color={color} w="full" maxW="700px" p="4" boxShadow="md" borderRadius="md">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          {user.avatar && user.avatar.url ? (
            <Avatar src={user.avatar.url} alt={user.name} />
          ) : (
            <Avatar name={user.name} alt={user.name} />
          )}
          <Text ml="4" fontWeight="bold" fontSize={textSize}>{user.name}</Text>
        </Flex>
        {followallow === 'allowfollow' ? (
          <Button colorScheme="blue" onClick={handleFollow} size={buttonSize}>
            Request to follow
          </Button>
        ) : followallow === 'requestedbyyou' ? (
          <Text fontSize={textSize}>Requested by you</Text>
        ) : followallow === 'requestedbyfriend' ? (
          <Text fontSize={textSize}>Requested by your friend</Text>
        ) : (
          <Text fontSize={textSize}>Followed</Text>
        )}
      </Flex>
    </Box>
  );
};

export default Peoplecard;
