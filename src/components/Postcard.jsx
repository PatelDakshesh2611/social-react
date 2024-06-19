import React, { useEffect, useState } from "react";
import "../cursorpointer.css"
import { Box, Button, Flex, Avatar, Text, useColorModeValue, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack,Spinner, Textarea,Image } from "@chakra-ui/react";
import { ChatIcon, ChevronDownIcon, ChevronLeftIcon, ChevronUpIcon,DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import swal from "sweetalert";

const Post = ({ user, image, description, likes, comments,createdat,userid,postid,handlegetpost,userdata,likesstatus,likescount }) => {
  const[likesnumber,setlikesnumber]=useState(likescount)
  const [liked, setLiked] = useState(likesstatus); 
  const[commentloader,setcommentloader]=useState(0)
  const [showComments, setShowComments] = useState(false); 
  const [comment, setComment] = useState(""); 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isLikesOpen, onOpen: onLikesOpen, onClose: onLikesClose } = useDisclosure(); 
  const bg = useColorModeValue("white", "gray.800"); 
  const color = useColorModeValue("gray.800", "white"); 
  

  const [commense,upd]=useState(comments)
  const [likesse,setlikes]=useState(likes)
  const[likesloader,setlikeloader]=useState(0)
  const[commentloadern,setcommentloadern]=useState(0);
  const handleLike = async() => {
    // Toggle the liked state
    try{
      const datatosend={
        postid:postid,
        userid:userid,
        status:liked
      }
      setlikeloader(1)
      const response=await axios.post('https://socialmedia-node-84id.onrender.com/handlelikes',datatosend)
      if(response.data.message==='post deleted'){
        swal('post deleted')
        handlegetpost()
        setlikeloader(0)
      }else{
        if(response.data.message==='add'){
          setlikes([...likesse,response.data.data])
          setlikesnumber(likesnumber+1)
          setlikeloader(0)
        }else{
          const updatedlikes=likesse.filter((u)=>{
            return u.id!==userid
          })
          setlikes(updatedlikes)
          setlikesnumber(likesnumber-1)
          setlikeloader(0)
        }
        setLiked(!liked);
        setlikeloader(0)
      }
    }catch(e){
      swal('Error occured at backend')
       console.log(e)
      setlikeloader(0)
    }
    
  };
  
  // A function to handle the comment button click
  const handleComment = () => {
    // Open the modal
    onOpen();
  };

  // A function to handle the show comments button click
  const handleShowComments = () => {
    // Toggle the show comments state
    setShowComments(!showComments);
  };

  // A function to handle the comment input change
  const handleCommentChange = (e) => {
    // Get the value from the event target
    const value = e.target.value;
    // Set the comment state to the value
    setComment(value);
  };

  const handleCommentSubmit = async() => {

    if (comment) {
      try{
        const datatosend={
          userid:userid,
          postid:postid,
          comment:comment
        }
        setcommentloader(1)
        const res=await axios.post('https://socialmedia-node-84id.onrender.com/docommments',datatosend)
       
        if(res.data.message=='post deleted'){
          swal('Sorry post deleted')
          handlegetpost()
        }else{
         
          upd([...commense,res.data])
        }
       
        setcommentloader(0)
        setComment("");
      }catch(e){
        swal('Error occured at backend')
        setcommentloader(0)
      }
    } else {
      // Alert the user to write a comment
      alert("Please write a comment");
    }
  };

  const deletecommentss=async(userid,postid,commentid)=>{
      try{
        setcommentloadern(commentid)
        const datatosend={
          userid,
          postid,
          commentid
         }
         const res=await axios.post('https://socialmedia-node-84id.onrender.com/deletecomment',datatosend)
         let id=(res.data.id)
         const newcomment=commense.filter((u)=>{
             return  u.id !== id;
         })
         upd(newcomment)
        setcommentloadern(0)

      }catch(e){
        swal('Error occured at backend')
        setcommentloadern(0)

      }
       
  }

  // A function to handle the likes button click
  const handleLikes = () => {
    // Open the likes modal
    
    onLikesOpen();
  };

  return (
    <Box mb={'50'} bg={bg} color={color} border={'1px solid grey'} w="full" maxW="600px" p="4" boxShadow="md" borderRadius="md">
      <Flex alignItems="center">
        {user.avatar && user.avatar.url?<Avatar src={user.avatar.url} alt={user.name} />:<Avatar name={user.name}></Avatar>}
        <Text ml="4" fontWeight="bold">{user.name}</Text>
        <Text ml='2'>{new Date(createdat).toISOString().split('T')[0]}</Text>
      </Flex>
      <Image  src={image} alt="Post image" w="full" h="auto" mt="4" objectFit="cover" />
      <Text mt="4">{description}</Text>
      <Flex mt="4" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Button  colorScheme={liked ? "red" : "gray"} variant="ghost"  onClick={handleLike}>
            {likesloader?<Spinner></Spinner>:<>{likesnumber + (liked ? 0 : 0)}</>}
          </Button>
          <Button onClick={handleLikes} leftIcon={<ChevronUpIcon />}></Button>
          <Button colorScheme="blue" variant="ghost" leftIcon={<ChatIcon />} onClick={handleComment}>
            Comment
          </Button>
        </Flex>
        <Button colorScheme="gray" variant="ghost" rightIcon={showComments ? <ChevronUpIcon /> : <ChevronDownIcon />} onClick={handleShowComments}>
          {showComments ? "Hide" : "Show"} Comments
        </Button>
      </Flex>
      {showComments && (
        <VStack mt="4" alignItems="flex-start" spacing="2">
          {commense.length>0?commense.map((comment) => (
            <Flex key={comment.id} alignItems="center">
              {comment.user.image?<Avatar src={comment.user.image} alt={comment.user.name} size="xs" />:<Avatar  name={comment.user.name} size="xs" />}
              <Text ml="2" fontWeight="bold">{comment.user.name}</Text>
              <Text ml="2">{comment.content}</Text>
            </Flex>
          )):<h1>No comments</h1>}
           {commentloader?<Spinner ml={'13vw'}></Spinner>:''}
        </VStack>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="flex-start" spacing="2">
              {commense.length>0?commense.map((comment) => (
                <Flex key={comment.id} alignItems="center">
                {comment.user.image?  <Avatar src={comment.user.image} alt={comment.user.name} size="xs" />:  <Avatar  name={comment.user.name} size="xs" />}
                  <Text ml="2" fontWeight="bold">{comment.user.name}</Text>
                  <Text ml="2">{comment.content}</Text>
                   
                  
                  {
                    comment.userid==userid?<>
                     {commentloadern==comment.id?<Spinner ml={"4px"}></Spinner>: <DeleteIcon onClick={()=>{deletecommentss(userid,postid,comment.id)}} className="cursor" ml={"4px"}></DeleteIcon>}</>:""
                  }
                </Flex>
                
              )):<h1>No comments</h1>}
               {commentloader?<Spinner ml={'13vw'}></Spinner>:''}
              <Flex w="full" alignItems="center">
               {userdata.avatar && userdata.avatar.url? <Avatar src={userdata.avatar.url} alt={user.name} size="xs" />: <Avatar  name={userdata.name} size="xs" />}
                <Textarea ml="2" placeholder="Write a comment..." value={comment} onChange={handleCommentChange} />
                <Button ml="2" colorScheme="blue" onClick={handleCommentSubmit}>
                  Submit
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isLikesOpen} onClose={onLikesClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Likes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="flex-start" spacing="2">
              {  
                <>{likesse.length>0?likesse.map((like) => (
                  <Flex key={like.id} alignItems="center">
                    {like.user.image?<Avatar src={like.user.image} alt={like.user.name} size="xs" />:<Avatar  name={like.user.name} alt={like.user.name} size="xs" />}
                    <Text ml="2" fontWeight="bold">{like.user.name}</Text>
                  </Flex>
                )):<h1>No likes</h1>}</>
              }
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Post;
