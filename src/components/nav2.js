import { Button, Flex, Link } from '@chakra-ui/react';
import { PersonOutline } from '@mui/icons-material';
import React from 'react';
import { Fade } from 'react-reveal';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import { useLogout } from '../hooks/logout';


function Nav2() {

    const { logout, isLoading } = useLogout()
    const nav = useNavigate()
    const { user, isLoading: pending } = useAuth()
    return (
        <div>
            <Fade top duration={2500}>
                <div className='nav2'>
                    <div className='nav2Links p-2 '>
                        <Link color="teal" as={RouterLink} to='/protected/dashboard' fontWeight="bold">
                            <div className='logo pt-2'>
                                <span className='logo1 '>cyber~wolf</span>
                                <span className='logo2 '>MEDIA SPHERE </span>
                            </div>
                        </Link>
                       
                    </div>
                </div>
            </Fade>
        </div>



    );
}

export default Nav2;