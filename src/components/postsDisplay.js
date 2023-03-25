import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import Nopost from './nopost';
import Post from './post';

function PostsDisplay({ posts }) {
    return (
        <div>
            {/*the first question mark prevents the code from breaking if the is no post initially cus we are peforming an asychronous task and  itwill be undefined initially */}
            <Box px="4" align='center'>
                {posts?.length === 0 ? 
                    <div>
                      <Nopost/>
                    </div>
                    : posts?.map(post => <Post key={post.id} post={post} />)}
            </Box>
        </div>
    );
}

export default PostsDisplay;