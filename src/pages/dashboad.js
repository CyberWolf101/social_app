import { Box, Button, Heading, HStack, Textarea } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav';
import PostsDisplay from '../components/postsDisplay';
import { auth } from '../config';
import useAuth from '../hooks/auth';
import { UsePost, useShowPost } from '../hooks/post';
import { SpinnerLg } from '../hooks/spinner';

function PostForm() {
    // const {user, isLoading} = useAuth();
    const [authUser, error] = useAuthState(auth);
    const { user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm();
    const { addPost, pending: addPostLoading } = UsePost();
    //pathname.startswith("/protected")
    useEffect(() => {
        if (!authUser) {
            navigate('/login')
        };
    }, [])

    const handlePost = async (data) => {
        console.log(data.post)
        addPost({
            post: data.post,
        });
        reset()
    }


    return (
        <div >
            <Nav />
            <div className='usr'>
                <div>
                    logged is as{" "}
                    <span>{user.username ? user.username : "Loading..."}</span>
                    <div className='line '></div>
                </div>
            </div>
            <br />
            <center>
                <form onSubmit={handleSubmit(handlePost)}>
                    <div className='mt-2 '>
                        <section className="post_section my-2">
                            <Heading size='md' >Share post</Heading>
                            <Button
                                colorScheme="teal"
                                size="sm"
                                type='submit'
                                isLoading={authLoading || addPostLoading}
                                loadingText="loading"
                            >
                                Post
                            </Button>
                        </section>
                        <div
                           style={{width:'92%'}}
                        >
                            <Textarea
                                resize="none"
                                placeholder='Create new post...'
                                rows={4}
                                {...register("post", { required: true })}
                            />
                        </div>


                    </div>
                </form>
            </center>
        </div>
    );
}


function Dashboad() {
    const { posts, isLoading: postsLoading } = useShowPost()

    if (postsLoading) return <div className='mt-5'><SpinnerLg /></div>
    return (
        <div>
            <PostForm />
            <PostsDisplay posts={posts} />
        </div>
    );
}

export default Dashboad;