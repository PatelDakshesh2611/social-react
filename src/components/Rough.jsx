import React, { useState } from "react";
import { Box, Flex, Avatar, Text, Button, useColorModeValue, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody, VStack, HStack, IconButton, Image, Grid } from "@chakra-ui/react";
import { EditIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from "@chakra-ui/icons";

const Profile = ({ }) => {
  const user = {
    id: 1,
    name: "MERN Stack",
    image: "user.jpg",
    followers: [
      { id: 2, name: "React JS", image: "react.jpg" },
      { id: 3, name: "Node JS", image: "node.jpg" },
      { id: 4, name: "Mongo DB", image: "mongo.jpg" },
    ],
    following: [
      { id: 5, name: "Chakra UI", image: "chakra.jpg" },
      { id: 6, name: "Material UI", image: "material.jpg" },
      { id: 7, name: "Bootstrap", image: "bootstrap.jpg" },
    ],
  };
  
  // The posts data
  const posts = [
    { id: 1, image: "post1.jpg", description: "This is my first post" },
    { id: 2, image: "post2.jpg", description: "This is my second post" },
    { id: 3, image: "post3.jpg", description: "This is my third post" },
  ];
  const [showFollowers, setShowFollowers] = useState(false); // The state to store if the followers are shown
  const [showFollowing, setShowFollowing] = useState(false); // The state to store if the following are shown
  const { isOpen, onOpen, onClose } = useDisclosure(); // The hooks to handle the drawer opening and closing
  const bg = useColorModeValue("white", "gray.800"); // The background color based on the color mode
  const color = useColorModeValue("gray.800", "white"); // The text color based on the color mode

  // A function to handle the edit profile button click
  const handleEditProfile = () => {
    // TODO: Write the logic to edit the profile
    console.log("Edit profile");
  };

  // A function to handle the logout button click
  const handleLogout = () => {
    // TODO: Write the logic to logout
    console.log("Logout");
  };

  // A function to handle the delete account button click
  const handleDeleteAccount = () => {
    // TODO: Write the logic to delete the account
    console.log("Delete account");
  };

  // A function to handle the show followers button click
  const handleShowFollowers = () => {
    // Toggle the show followers state
    setShowFollowers(!showFollowers);
  };

  // A function to handle the show following button click
  const handleShowFollowing = () => {
    // Toggle the show following state
    setShowFollowing(!showFollowing);
  };

  // A function to handle the drawer close button click
  const handleDrawerClose = () => {
    // Close the drawer
    onClose();
    // Reset the show followers and show following states to false
    setShowFollowers(false);
    setShowFollowing(false);
  };

  return (
    <Box bg={bg} color={color} w="full" h="100vh" overflow="hidden">
      <Flex position="fixed" right="0" top="0" w="300px" h="100vh" p="4" boxShadow="lg" direction="column" alignItems="center" justifyContent="space-between">
        <Avatar src={user.image} alt={user.name} w="200px" h="200px" />
        <VStack spacing="4">
          <Text fontSize="xl" fontWeight="bold">{user.name}</Text>
        </VStack>
      </Flex>
      <IconButton aria-label="Open drawer" icon={<ChevronDownIcon />} position="fixed" right="0" top="50%" transform="translateY(-50%)" onClick={onOpen} />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">Profile</Text>
              <IconButton aria-label="Close drawer" icon={<CloseIcon />} onClick={handleDrawerClose} />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex direction="column" alignItems="center" justifyContent="space-between" h="full">
              <Avatar src={user.image} alt={user.name} w="200px" h="200px" />
              <VStack spacing="4">
                <Button colorScheme="blue" leftIcon={<EditIcon />} onClick={handleEditProfile}>
                  Edit Profile
                </Button>
                <Button colorScheme="red" onClick={handleLogout}>
                  Logout
                </Button>
                <Button colorScheme="red" variant="outline" onClick={handleDeleteAccount}>
                  Delete Account Permanently
                </Button>
              </VStack>
              <VStack spacing="4">
                <Text fontSize="xl" fontWeight="bold">{user.name}</Text>
                <HStack spacing="4">
                  <Button colorScheme="gray" variant="ghost" rightIcon={showFollowers ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={handleShowFollowers}>
                    {user.followers.length} Followers
                  </Button>
                  <Button colorScheme="gray" variant="ghost" rightIcon={showFollowing ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={handleShowFollowing}>
                    {user.following.length} Following
                  </Button>
                </HStack>
                {showFollowers && (
                  <VStack spacing="2" alignItems="flex-start">
                    {user.followers.map((follower) => (
                      <Flex key={follower.id} alignItems="center">
                        <Avatar src={follower.image} alt={follower.name} size="xs" />
                        <Text ml="2" fontWeight="bold">{follower.name}</Text>
                      </Flex>
                    ))}
                  </VStack>
                )}
                {showFollowing && (
                  <VStack spacing="2" alignItems="flex-start">
                    {user.following.map((follow) => (
                      <Flex key={follow.id} alignItems="center">
                        <Avatar src={follow.image} alt={follow.name} size="xs" />
                        <Text ml="2" fontWeight="bold">{follow.name}</Text>
                      </Flex>
                    ))}
                  </VStack>
                )}
              </VStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Grid container spacing={2} p="4" pl="320px" gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}>
     
      </Grid>
    </Box>
  );
};

export default Profile;