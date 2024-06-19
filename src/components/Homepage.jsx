import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import Postcard from './Postcard';
import axios from 'axios';
import swal from 'sweetalert';
import './ScrollToTopButton.css';
import { Spinner, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';

const Homepage = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Fetch post data using React Query
  const { data: postdata, isLoading, isError, refetch } = useQuery(['getPosts', props.id], () =>
    axios.get(`https://socialmedia-node-84id.onrender.com/getpost/${props.id}`).then((res) => res.data.postdata).catch((e)=>{console.log(e)})
  );

  // Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
          <Spinner size={'xl'} />
        ) : isError ? (
          <Text>Error occurred while fetching data</Text>
        ) : (
          <>
            {postdata.length > 0 ? (
              <>
                {postdata.map((u) => (
                  <Postcard
                    key={u._id}
                    userdata={props.usersdata}
                    handlegetpost={refetch} // Refetch data on successful actions
                    postid={u._id}
                    userid={props.id}
                    likes={u.likes}
                    image={u.image.url}
                    user={u.user}
                    likesstatus={u.likestatus}
                    createdat={u.createdAt}
                    description={u.caption}
                    comments={u.comments}
                    likescount={u.likescount}
                  />
                ))}
                <button id="scrollToTopBtn" className={isVisible ? 'show' : 'hide'} onClick={scrollToTop}>
                  <ArrowUpIcon />
                </button>
              </>
            ) : (
              <Text>No Post Exist</Text>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
