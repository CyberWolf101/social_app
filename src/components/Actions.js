import { Flex, IconButton } from '@chakra-ui/react';
import { Delete, Favorite, FavoriteBorder } from '@mui/icons-material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubble from '@mui/icons-material/ChatBubble';
import React, { useState } from 'react';
import useAuth from '../hooks/auth';
import { UseToogleLike } from '../hooks/useToogleLike';
import { Link } from 'react-router-dom';
import { useDeletePost } from '../hooks/post'
import { useComment } from '../hooks/useComment';

function Actions({ post }) {
    const { likes, id, uid } = post;
    const { user, isLoading: userLoading } = useAuth();

    const liked = likes.includes(user?.id)   //so if it includes the current user id, we want to out the heart symbols conditionally...if the id's in the likes array does not include that id, it will return false

    const { toggleLike, isLoading: likeLoading } = UseToogleLike({ id, liked, uid: user.id });

    const { deletePost, isLoading: loadingDelete } = useDeletePost(id)

    const { comments, isLoading: commentLoading } = useComment(id) //we get the id from the post object so as to know which comment we are looking for

    return (
        <div>
            <Flex p="2">
                <Flex alignItems="center">
                    <IconButton
                        size="sm" colorScheme="red"
                        isLoading={likeLoading || userLoading}
                        onClick={toggleLike}
                        variant="ghost"
                        isRound
                        icon={liked ? <Favorite /> : <FavoriteBorder />} />
                    {likes.length}
                </Flex>
                <Flex alignItems="center" ml="2">
                    <IconButton
                        size="sm" colorScheme="teal"
                        isLoading={commentLoading || userLoading}
                        as={Link}
                        to={`/protected/comments/${id}`}
                        variant="ghost"
                        isRound
                        icon={comments?.length === 0 ? <ChatBubbleOutlineIcon /> : <ChatBubble />}
                    />
                    {comments?.length}
                </Flex>
                <Flex alignItems="center" ml="auto">
                    {
                        !userLoading && user.id === uid && (
                            <IconButton
                                size="sm" colorScheme="red"
                                onClick={deletePost}
                                isLoading={loadingDelete || likeLoading || userLoading}
                                variant="ghost"
                                isRound
                                icon={<Delete />}
                            />
                        )
                    }
                </Flex>

            </Flex>
        </div>
    );
}

export default Actions;