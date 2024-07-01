import React, { useEffect, useState } from "react";
import { Box, Flex, Avatar, Text, Button, useColorModeValue, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack, HStack, IconButton, Grid, Spinner } from "@chakra-ui/react";

import Postcard from './Postcard'
import { EditIcon, ChevronDownIcon, ChevronUpIcon,  } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Profile = ({usersdata,setudata,imageloader,setimageloader,setid,connection}) => {
const nav=useNavigate()
const [followers,setfollwers]=useState([])
const [following,serfollowing]=useState([])
   const[postdata,setpostdata]=useState([])
   const [loader,setloader]=useState(0)

   const handlepermanentdelete = async () => {
    const confirmDelete = await swal({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    });
  
    if (confirmDelete) {
      try {
        await axios.post("https://socialmedia-node-84id.onrender.com/deleteaccount", { userid: usersdata._id });
        swal("Account deleted successfully.", { icon: "success" });
        setudata('')
        setid('')
        localStorage.removeItem('toggle')
        localStorage.removeItem('id')
        localStorage.removeItem('userdata')
        nav('/login')
        // Optionally, perform any other cleanup or navigation logic after successful deletion
      } catch (error) {
        swal("Error deleting account.", { icon: "error" });
      }
    }
  };
  
  const getfollowers=async()=>{
   try{
    const res=await axios.get(`${connection}/getfollowers/${usersdata._id}`)
    setfollwers(res.data.followers)
    serfollowing(res.data.following)
   }catch(e){
    swal('Error occured at backend')
   }
  }
  const getmypost=async()=>{
     try{
      setloader(1)
     const res=await axios.get(`${connection}/getmypost/${usersdata._id}`)
     setpostdata(res.data.postdata)
    setloader(0)
    }
     catch(e){
      setloader(0)
      console.log(e)
     }
  }

  const saveprofilepicture=async(e)=>{
    try{
      const filedata={
        image:e.target.files[0],
        id:usersdata._id
      }
      setimageloader(1)
      const res=await axios.post(`${connection}/saveprofileimage`,filedata,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      const data=JSON.parse(localStorage.getItem('userdata'));
      setudata({...usersdata,avatar:res.data.avatar})
      localStorage.setItem('userdata',JSON.stringify({...data,avatar:res.data.avatar}))
      getmypost()
      setimageloader(0)
    }catch(e){
      setimageloader(0)
      swal('Error occured at backend')
    }
    
  }
useEffect(()=>{
   getmypost()
   getfollowers()
},[])
  
  const [showFollowers, setShowFollowers] = useState(false); 
  const [showFollowing, setShowFollowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const bg = useColorModeValue("white", "gray.800"); 
  const color = useColorModeValue("gray.800", "white"); 
  const handleLogout = () => {
     setudata('')
     setid('')
     localStorage.removeItem('toggle')
     localStorage.removeItem('id')
     localStorage.removeItem('userdata')
     nav('/login')
  };

 


  // A function to handle the show followers button click
  const handleShowFollowers = () => {
    // Toggle the show followers state
    setShowFollowers(!showFollowers);
  };


  const handleShowFollowing = () => {
 
    setShowFollowing(!showFollowing);
  };


  const handleDrawerClose = () => {
  
    onClose();
    
    setShowFollowers(false);
    setShowFollowing(false);
  };

  return (
    <Box mt={"10vh"}  bg={bg} color={color} w="full" h="100%" overflow="hidden">
     
     <div  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <Text as={'bold'} fontSize={'6xl'}>My posts</Text>
         {
          loader?<Spinner size={'xl'}></Spinner>:<>
              {
                postdata.length>0?<>
                 {
                  postdata.map((u)=>{
                    return(
                      <Postcard connection={connection} userdata={usersdata} handlegetpost={getmypost} postid={u._id} userid={usersdata._id} likes={u.likes} image={u.image.url}  user={u.user} likesstatus={u.likestatus} createdat={u.createdAt} description={u.caption} comments={u.comments} likescount={u.likescount}></Postcard>
                    )
                  })
                 }
                </>:
                <Text>No Post Exist</Text>
              }
          </>
         }
      </div>

      <IconButton aria-label="Open drawer" icon={<ChevronDownIcon />} position="fixed" right="0" top="50%" transform="translateY(-50%)" onClick={onOpen} />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>  
          <DrawerBody>
            <Flex position={'static'} direction="column" alignItems="center" justifyContent="space-between" h="full">
             {imageloader?<Spinner></Spinner>:<> {usersdata.avatar && usersdata.avatar.url?<><Avatar src={usersdata.avatar.url} alt={usersdata.name} w="200px" h="200px" /></>:<><Avatar name={usersdata.name} alt={usersdata.name} w="200px" h="200px" /></>}</>}
              <VStack spacing="4">
                <Button colorScheme="blue" leftIcon={<EditIcon />}  onClick={() => document.getElementById('fileInput').click()}>
                  Change profile image
                </Button>
                <input
                type="file"
                id="fileInput"
                accept="image/*"
                name="image"
                style={{ display: 'none' }}
                onChange={(e)=>{saveprofilepicture(e)}}
                 />
                <Button colorScheme="red" onClick={handleLogout}>
                  Logout
                </Button>
                {/* <Button colorScheme="red" onClick={handlepermanentdelete}>
                  Delete Account Permanently
                </Button> */}
              </VStack>
              <VStack spacing="4">
                <Text fontSize="xl" fontWeight="bold">{usersdata.name}</Text>
                <HStack spacing="4">
                  <Button colorScheme="gray" variant="ghost" rightIcon={showFollowers ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={handleShowFollowers}>
                    { followers.length} Followers
                  </Button>
                  <Button colorScheme="gray" variant="ghost" rightIcon={showFollowing ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={handleShowFollowing}>
                    {following.length} Following
                  </Button>
                </HStack>
                {showFollowers && (
                  <VStack spacing="2" alignItems="flex-start">
                    {followers.map((follower) => (
                      <Flex key={follower.id} alignItems="center">
                        {
                          follower.image?<Avatar src={follower.image} alt={follower.name} size="xs" />:<Avatar  name={follower.name} size="xs" />
                        }
                        <Text ml="2" fontWeight="bold">{follower.name}</Text>
                      </Flex>
                    ))}
                  </VStack>
                )}
                {showFollowing && (
                  <VStack spacing="2" alignItems="flex-start">
                    {following.map((follow) => (
                      <Flex key={follow.id} alignItems="center">
                        {
                          follow.image?<Avatar src={follow.image} alt={follow.name} size="xs" />:<Avatar  name={follow.name} size="xs" />
                        }
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