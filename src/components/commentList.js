import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { useComment } from '../hooks/useComment';
import MapComments from './mapComments';

const CommentList = ({ post }) => {
    const { id } = post;
    const { comments, isLoading, error } = useComment(id)
    if (isLoading) return <Box align="center" pt="50"><Spinner size="xl" thickness='4px' color="teal" /></Box>

    return (
        <div>
            {comments.map((comment) => (
                <MapComments key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;