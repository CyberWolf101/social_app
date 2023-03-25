import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { useUser } from '../hooks/useUser';
import Avatar from './Avatar';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { SpinnerSm } from '../hooks/spinner';

//we need a specific user avatar
const Header = ({ uid, date }) => {
    const { user, isLoading } = useUser(uid)  //this function expects an id and we are grabbing it has a prop from the dashboard component
    if(isLoading)return <Spinner size="sm"/>
    if(!user)return <div>p</div>

    return (
        <div>
            <Flex
                alignItems="center"
                borderBottom="2px solid"
                borderColor="teal.100"
                p="3"
                bg="gray.50"
            >
                <Avatar user={user} />

                <Box ml="4">
                    <Button
                        colorScheme="teal"
                        variant="link"
                    >
                        {user?  user.username: <SpinnerSm/>}
                    </Button>
                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        {formatDistanceToNow(date)} ago
                    </Text>
                </Box>
            </Flex>
        </div>
    );
};

export default Header;