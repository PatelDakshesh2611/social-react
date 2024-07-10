import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import Postcard from './Postcard';
import axios from 'axios';
import { Flex, Spinner, Text, Button } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';

const Homepage = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const loadMoreRef = useRef(null);

  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(`${props.connection}/getpost/${props.id}`, {
      params: { page: pageParam, limit: 5 },
    });
    return res.data.postdata;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['getPosts'], fetchPosts, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 5) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, hasNextPage, fetchNextPage]);

  return (
    <div>
      <Flex flexDirection={'column'} mt={['10px', '10px', '0px', '0px']} justifyContent={'center'} alignItems={'center'}>
        {isLoading ? (
          <Flex width={'100%'} height={'75vh'} alignItems={'center'} justifyContent={'center'}>
            <Spinner size={['sm', 'sm', 'xl', 'xl']} />
          </Flex>
        ) : isError ? (
          <Text>Error occurred while fetching data</Text>
        ) : (
          <>
            {data?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page.map((u) => (
                  <Postcard
                    key={u._id}
                    userdata={props.usersdata}
                    handlegetpost={fetchNextPage} // Refetch data on successful actions
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
                    connection={props.connection}
                  />
                ))}
              </React.Fragment>
            ))}
            <button id="scrollToTopBtn" className={isVisible ? 'show' : 'hide'} onClick={scrollToTop}>
              <ArrowUpIcon />
            </button>
            <Flex  mb={['90px', '90px', '0px', '0px']} ref={loadMoreRef}>
            {isFetchingNextPage && (
              <Text>Loading more...</Text>
            )}
            {!hasNextPage && (
              <Text>No more posts</Text>
            )}
            </Flex>
         
          </>
        )}
      </Flex>
    </div>
  );
};

export default Homepage;
