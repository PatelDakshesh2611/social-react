import React, { useState } from "react";
import { Box, Button, Flex, Image, Input, Textarea, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import swal from "sweetalert";
import { Spinner } from "@chakra-ui/react";

const CreatePost = (props) => {
  const[loader,setloader]=useState(0)
  const [image, setImage] = useState(null); 
  // The state to store the selected image
  const [imagetosend,setimagetosend]=useState(null)
  const [description, setDescription] = useState(""); // The state to store the description
  const bg = useColorModeValue("white", "gray.800"); // The background color based on the color mode
  const color = useColorModeValue("gray.800", "white"); // The text color based on the color mode

  // A function to handle the image selection
  const handleImageChange = (e) => {
    // Get the first file from the event target
    const file = e.target.files[0];
    // Check if the file is an image
    if (file && file.type.startsWith("image/")) {
      setimagetosend(file)
      // Create a URL for the file
      const url = URL.createObjectURL(file);
      // Set the image state to the URL
      setImage(url);
    } else {
      // Reset the image state to null
      setImage(null);
    }
  };

  // A function to handle the description change
  const handleDescriptionChange = (e) => {
    // Get the value from the event target
    const value = e.target.value;
    // Set the description state to the value
    setDescription(value);
  };

  // A function to handle the post submission
  const handleSubmit = async() => {
    // Check if the image and description are not empty
    if (image && description) {
      // TODO: Write the logic to submit the post to the server
     const formdata={
      "image":imagetosend,
      "desc":description,
      "owner":props.id
     }
      try{
        setloader(1)
        const res=await axios.post('https://socialmedia-node-84id.onrender.com/createpost',formdata,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        })
        setloader(0)
        setImage(null);
        setDescription("");
        if(res.data.message==='Image uploaded successfully'){
          swal('Post uploaded successfully')
        }
      }catch(e){
        swal('Error occured at backend')
        setloader(0)
      }
      
     
    } else {
      // Alert the user to fill the required fields
      swal("Please select an image and write a description");
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Box bg={bg} color={color} w="full" maxW="600px" p="4" boxShadow="md" borderRadius="md">
      <Flex alignItems="center" justifyContent="space-between">
        <Input name="image" type="file" accept="image/*" onChange={handleImageChange} />
        {
          loader?<Button colorScheme="blue" >
          <Spinner></Spinner>
        </Button>:
        <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={handleSubmit}>
        Post
      </Button>
        }
      </Flex>
      {image && (
        <Image src={image}  alt="Selected image" w="full" h="auto" mt="4" objectFit="cover" />
      )}
      <Textarea h={'25vh'} mt="4" placeholder="Write a description..." value={description} onChange={handleDescriptionChange} />
    </Box>
     
    </div>
  );
};

export default CreatePost;
