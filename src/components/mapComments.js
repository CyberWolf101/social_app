import React from 'react';
import { Box, Flex, IconButton, Spinner, Text } from '@chakra-ui/react';
import { useUser } from '../hooks/useUser';
import Avatar from "./Avatar"
import { formatDistanceToNow } from 'date-fns';
import { Delete } from '@mui/icons-material';
import { useDeleteComment } from '../hooks/useComment';
import useAuth from '../hooks/auth';

function MapComments({ comment }) {
    const { uid, date, id } = comment;
    const { user, isLoading: commentLoading } = useUser(uid)
    const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id)
    const { user: Authuser, isLoading: AuthuserLoading } = useAuth()

    if (commentLoading) return <Spinner size="sm" color="teal" />
    return (
        <div>
            <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
                <div className='d-flex align-items-center'>
                    <div>  <Avatar user={user} /></div>
                    <div className='mx-1 fw-bold'>  {user.username}</div>
                </div>
                <div className='ms-1 p-1 rounded mt-1 d-flex '
                    style={{ backgroundColor: "#f7fafc", justifyContent:'space-between'}}
                >
                    <div>
                        <Text>
                            {comment.comment}
                        </Text>

                        <Text fontSize="xs" color="gray.500">
                            {formatDistanceToNow(date)} ago
                        </Text>
                    </div>

                    {/*so if the Authuser id is = to the uid which we destructured from the comments */}
                    <div>
                        {!AuthuserLoading && Authuser.id === uid && (
                            <IconButton
                                size='sm'
                                ml="auto"
                                icon={<Delete />}
                                colorScheme="red"
                                variant="ghost"
                                isRound
                                onClick={deleteComment}
                                isLoading={commentLoading || deleteLoading}
                            />
                        )}
                    </div>
                </div>
            </Box>


        </div >
    );
}

export default MapComments;