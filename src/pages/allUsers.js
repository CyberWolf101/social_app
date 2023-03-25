import { Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import React from 'react';
import { Fade } from 'react-reveal';
import MappedUsers from '../components/MappedUsers';
import { useUsers } from '../hooks/useUser';

function AllUsers() {
    const { users, isLoading } = useUsers();
    if (isLoading) return <center><Spinner size="xl" mt="20" /></center>
    return (
        <div>
            <Heading as='h4' size='md' color="teal" align="center" mt="5">
                ALL USERS
            </Heading>
                <SimpleGrid colums={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
                    {
                        users?.map((user) => (
                            <MappedUsers key={user.id} user={user} />
                        ))
                    }
                </SimpleGrid>
        </div>
    );
}

export default AllUsers;

