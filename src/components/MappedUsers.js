import { Button, Code, Link, VStack } from '@chakra-ui/react';
import React from 'react';
import Avatar from './Avatar';
import { Link as RouterLink } from 'react-router-dom'
import { Fade } from 'react-reveal';

const MappedUsers = ({ user, isLoading }) => {
    const { id, username } = user;
    return (
        <div>
            <Fade bottom duration={2000}>

            <VStack
                bg="gray.100"
                rounded="md"
                shadow="sm"
                textAlign="center"
                p='4'
                spacing="3"
            >
                <Avatar user={user} />
                <Code>@{username}</Code>
                <Link>
                    <Button
                        as={RouterLink}
                        to={`/protected/profile/${id}`}
                        size="sm"
                        variant="link"
                        colorScheme="teal"
                    >
                        View Profile
                    </Button>
                </Link>
            </VStack>
            </Fade>
        </div>
    );
};

export default MappedUsers;