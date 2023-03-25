import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Actions from './Actions';
import Header from './Header';
import {Fade} from "react-reveal"

export default function Post({ post }) {
    console.log(post)

    const { post: userPost, uid, date } = post;
    return (
        <div>
            <Fade bottom duration={1500}>
                <Box p="2" maxW="600px" textAlign="left">
                    <Box border="2px solid" borderColor="gray.100" borderRadius='md'>
                        <Header uid={uid} date={date} />
                        <Box p="2" minH="100px">
                            <Text wordBreak="break-word" fontSize="md">
                                {userPost}
                            </Text>
                        </Box>
                    </Box>
                    <Actions post={post} />
                </Box>
            </Fade>
        </div>
    );
}

