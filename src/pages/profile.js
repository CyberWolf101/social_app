import { Button, Divider, Flex, HStack, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../components/Avatar';
import ModalDisplay from '../components/modal';
import PostsDisplay from '../components/postsDisplay';
import { useFetchLikes, useSpecificPosts } from '../hooks/post';
import { useUser } from '../hooks/useUser';
import { SpinnerLg } from '../hooks/spinner';
import useAuth from '../hooks/auth';
import Nav from '../components/nav';
import { Link } from 'react-router-dom';
import { PeopleAlt } from '@mui/icons-material';

function Profile() {
    const { id } = useParams()
    const { user: authUser, isLoading: authLoading } = useAuth()
    const { posts, isLoading: postsLoading } = useSpecificPosts(id);
    const { user, isLoading: userLoading } = useUser(id)
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const {d} = useFetchLikes(id)
    // console.log(d)

    if (userLoading || authLoading || postsLoading) return <center><Spinner size="xl" mt="20" /></center>
    return (
        <div>
            <Nav />
            <center>
                    <Link to="/allusers">
                        <button className='btn fw-bold text-white btn-sm my-3' style={{background:"#90CDFA"}}>
                            Discover <PeopleAlt fontSize='sm'/>
                        </button>
                    </Link>
                </center>
            <Stack spacing="5" mt="3">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar size='xl' user={user} />
                    <Text fontSize="2xl">
                        {user.username}
                    </Text>

                </div>
                {!authLoading && (authUser.id === user.id) &&
                    <div className='px-4 mt-2'>
                        <Button mb="2" w='full' colorScheme="teal" onClick={onOpen}>
                            Change DP
                        </Button>
                    </div>
                }
                <Flex p={["2", "6"]} pos="relative" align="center">

                    <Stack ml="10">

                        <HStack spacing="10">
                            <Text color="gray.700" fontSize={["sm", "lg"]}>
                                posts: <b> {posts.length}</b>
                            </Text>
                            <Text color="gray.700" fontSize={["sm", "lg"]}>
                                Gender: <b>NIL</b>
                            </Text>
                            <Text color="gray.700" fontSize={["sm", "lg"]}>
                                Joined: <b>{format(user.date, "MMM YYY")}</b>
                            </Text>
                        </HStack>
                    </Stack>
                    <ModalDisplay isOpen={isOpen} onClose={onClose} />
                </Flex>
               
                <Divider />
                <center>

                    <Text color="teal">
                        <b> All {user.username}'s posts</b>
                    </Text>
                </center>

                {postsLoading ? (<div><SpinnerLg /></div>)
                    : (
                        <PostsDisplay posts={posts} />
                    )}
            </Stack>
        </div>
    );
}

export default Profile;