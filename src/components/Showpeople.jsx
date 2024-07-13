import React, { useEffect, useState } from 'react';
import { Text, Spinner, Input, Flex } from '@chakra-ui/react';
import Peoplecard from './Peoplecard';
import axios from 'axios';
import swal from 'sweetalert';
import { useQuery } from 'react-query';

const Showpeople = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch people data using React Query
  const { data: people, isLoading, isError, refetch } = useQuery(['getPeople', props.id], async () => {
    const res = await axios.get(`${props.connection}/getpeople/${props.id}`);
    return res.data.people;
  });

  
  // Function to filter people based on search term
  const filteredPeople = people?.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
  // console.log(filteredPeople)
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
 
  
  useEffect(() => {
    refetch(); // Refetch data when component mounts or props change
  }, [props.id, refetch]);

  return (
    <Flex flexDirection={"column"} alignItems={'center'} mt={['9px','9px','30px','30px']} mb={['60px','60px','','']}>
      <Input
        onChange={handleSearchChange}
        placeholder='Search for friends'
        width={['100vw','40vw','35vw','30vw']}
        type="text"
      />
      {isLoading ? (
        <Spinner size={['sm','sm','xl','xl']} />
      ) : isError ? (
        <Text>Error occurred while fetching data</Text>
      ) : filteredPeople?.length > 0 ? (
        filteredPeople.map(u => <Peoplecard key={u._id} user={u} getpeople={refetch} status={u.status} id={props.id} connection={props.connection} />)
      ) : (
        <Text>No result found for your search</Text>
      )}
    </Flex>
  );
};

export default Showpeople;
