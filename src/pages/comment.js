import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/commentList';
import NewComment from '../components/NewComment';
import Post from '../components/post';
import { useFetchPostById } from '../hooks/post';

const Comment = () => {
    const { id } = useParams()
    const { post, isLoading } = useFetchPostById(id)
    if (isLoading) {
        return <Box align="center" pt="50"><Spinner size="xl" thickness='4px' color="teal" /></Box>
    }
    return (
        <div>
            <Box align="center" pt="50">
                <Post post={post} />
                <NewComment post={post} />
                <CommentList post={post}/>
            </Box>
        </div>
    );
};

export default Comment;