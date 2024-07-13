import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Input,
    Button,
    VStack,
    Text,
    Image,
    HStack,
    useColorMode,
    IconButton
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import io from 'socket.io-client';

const Chat = (props) => {
    const [userList, setUserList] = useState([]);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [idToSendMessage, setIdToSendMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const socketRef = useRef(null);
    const messageEndRef = useRef(null);
    const { colorMode, toggleColorMode } = useColorMode();
    const id = JSON.parse(localStorage.getItem('userdata'))._id;

    useEffect(() => {
        socketRef.current = io(props.connection, {
            query: { id }
        });
        socketRef.current.emit('setUserId', id);
        socketRef.current.on('connect', () => {
            console.log('Connected to server');
        });

        socketRef.current.on('mymessage', (msg) => {
            setUserList((prevUserList) =>
                prevUserList.map((u) => {
                    if (u._id === msg.savedMessage.receiver) {
                        return { ...u, messages: [...u.messages, msg.savedMessage] };
                    } else {
                        return u;
                    }
                })
            );
            setMessageList((prev) => [...prev, msg.savedMessage]);
        });

        socketRef.current.on('userList', (users) => {
            setUserList(users);
        });

        socketRef.current.on('messagereceived', (msg) => {
            setUserList((prevUserList) =>
                prevUserList.map((u) => {
                    if (u._id === msg.savedMessage.sender) {
                        return { ...u, messages: [...u.messages, msg.savedMessage] };
                    } else {
                        return u;
                    }
                })
            );           
            if (selectedUser && msg.savedMessage.sender === selectedUser._id) {
                console.log(selectedUser,msg.savedMessage.receiver)
                setMessageList((prev) => [...prev, msg.savedMessage]);
            }
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [id, selectedUser]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageList]);

    const sendMessage = () => {
        if (socketRef.current) {
            if (idToSendMessage && message.trim()) {
                socketRef.current.emit('sendmessage', {
                    receiver: idToSendMessage,
                    message: message,
                    sender: id
                });
                setMessage('');
            } else {
                alert('Please select any user and write a message');
            }
        } else {
            console.error('Socket connection not established.');
        }
    };

    const onClickUser = (user) => {
        setSelectedUser((prev)=>user);
        setIdToSendMessage(user._id);
        setMessageList(user.messages || []);
    };

    return (
        <Box display="flex" height="92vh">
            <VStack width={['36%','45%','25%','25%']} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} p={4} borderRight="1px solid" borderColor="gray.200" overflowX="auto">
                <HStack justifyContent="space-between" width="100%" mb={4}>
                    <Text fontSize="xl">User List</Text>
                </HStack>
                {
                    userList.length>0?<>
                    {userList.map((user) => (
                    <Box
                        key={user._id}
                        cursor="pointer"
                        onClick={() => onClickUser(user)}
                        backgroundColor={idToSendMessage === user._id ? 'blue.300' : 'transparent'}
                        display="flex"
                        alignItems="center"
                        p={2}
                        borderRadius="md"
                        w="100%"
                    >
                        {user.img_url ? (
                            <Image
                                borderRadius="full"
                                boxSize={['27px','27px','38px','40px']}
                                src={user.img_url}
                                alt={user.name}
                                mr={3}
                            />
                        ) : (
                            <Box
                                borderRadius="full"
                                boxSize={['27px','27px','40px','40px']}
                                bg="gray.400"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="white"
                                mr={3}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </Box>
                        )}
                        <Text fontSize={['10px','10px','17px','20px']}>{user.name}</Text>
                    </Box>
                ))}</>:<Text>Follow peoples to start chatting</Text>
                }
            </VStack>
            <Box flex="1" p={4} display="flex" flexDirection="column">
                <HStack mb={4} p={4} bg={colorMode === 'light' ? 'gray.200' : 'gray.600'} borderRadius="md">
                    {selectedUser ? (
                        <>
                            {selectedUser.img_url ? (
                                <Image
                                    borderRadius="full"
                                    boxSize="40px"
                                    src={selectedUser.img_url}
                                    alt={selectedUser.name}
                                />
                            ) : (
                                <Box
                                    borderRadius="full"
                                    boxSize="40px"
                                    bg="gray.400"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    color="white"
                                >
                                    {selectedUser.name.charAt(0).toUpperCase()}
                                </Box>
                            )}
                            <VStack alignItems="flex-start">
                                <Text fontSize={['x-small','sm','md','lg']}>{selectedUser.name}</Text>
                                <Text fontSize={['x-small','sm','md','lg']} color="green.400">Active</Text>
                            </VStack>
                        </>
                    ) : (
                        <Text>Select a user to start chatting</Text>
                    )}
                </HStack>
                <Box display="flex" flexDirection="column" h="80vh" mb={4} overflowY="auto">
                    {idToSendMessage !== '' ? messageList.map((msg, index) => (
                        <Box
                            w="100px"
                            key={index}
                            mb={4}
                            p={2}
                            bg={msg.sender === id ? 'green.100' : 'gray.50'}
                            borderRadius="md"
                            alignSelf={msg.sender === id ? 'flex-end' : 'flex-start'}
                        >
                            <Text color={colorMode === 'dark' ? 'black' : ''} fontSize="md">{msg.message}</Text>
                        </Box>
                    )) : (
                        <Text>Please select a user to start chatting</Text>
                    )}
                    <div ref={messageEndRef} />
                </Box>
                <HStack >
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."         
                        flex="1"
                    />
                    <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
                </HStack>
            </Box>
        </Box>
    );
};

export default Chat;
