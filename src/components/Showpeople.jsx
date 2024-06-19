import React, { useEffect, useState } from 'react';
import { Text, Spinner } from '@chakra-ui/react';
import Peoplecard from './Peoplecard';
import axios from 'axios';
import swal from 'sweetalert';
import { useQuery } from 'react-query';

const Showpeople = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch people data using React Query
  const { data: people, isLoading, isError, refetch } = useQuery(['getPeople', props.id], async () => {
    const res = await axios.get(`https://socialmedia-node-84id.onrender.com/getpeople/${props.id}`);
    return res.data.people;
  });

  // Function to filter people based on search term
  const filteredPeople = people?.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    refetch(); // Refetch data when component mounts or props change
  }, [props.id, refetch]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <input
        onChange={handleSearchChange}
        placeholder='Search for friends'
        style={{ border: '2px solid grey', width: '30vw', height: '8vh', borderRadius: '7px', fontSize: '20px', textAlign: 'center' }}
        type="text"
      />
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Text>Error occurred while fetching data</Text>
      ) : filteredPeople?.length > 0 ? (
        filteredPeople.map(u => <Peoplecard key={u.id} user={u} getpeople={refetch} status={u.status} id={props.id} />)
      ) : (
        <Text>No result found for your search</Text>
      )}
    </div>
  );
};

export default Showpeople;
