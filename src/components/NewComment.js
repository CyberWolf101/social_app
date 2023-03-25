import { Box, Button, Flex, Input, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/auth';
import { UseAddcomment } from '../hooks/useComment';
import { commentValidate } from '../Logic/validate';
import Avatar from './Avatar';

function NewComment({ post }) {
    const { id: postID } = post;
    const { user, isLoading: AuthLoading } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const { addComment, isLoading: commentLoading } = UseAddcomment({ postID, uid: user?.id })

    const handleAddComment = (data) => {
        console.log(user)
        addComment(data.comment)

        reset()
    }

    if (AuthLoading) return <Spinner size="sm" />
    return (
        <div>
            <Box maxW="600px" mx="auto" py="6">
                <form onSubmit={handleSubmit(handleAddComment)}>

                    <div className='comment-section'>
                        <div className='mx-1'>
                            <Avatar user={user} />
                        </div>
                        <Box flex='1' mt="4">
                            <Input
                                size="sm"
                                variant="flushed"
                                placeholder="Write comment..."
                                autoComplete='off'
                                {...register("comment", commentValidate)}
                            />
                        </Box>
                        <div className='mx-1'>
                            <Flex pt="2">
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    size="xs"
                                    ml="auto"
                                    isLoading={commentLoading || AuthLoading}
                                >
                                    Add Comment
                                </Button>
                            </Flex>
                        </div>

                    </div>
                </form>

            </Box>

        </div>
    );
}

export default NewComment;