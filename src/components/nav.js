import { Button, Flex, Link } from '@chakra-ui/react';
import { PersonOutline } from '@mui/icons-material';
import React from 'react';
import { Fade } from 'react-reveal';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth';
import { useLogout } from '../hooks/logout';


function Nav() {

    const { logout, isLoading } = useLogout()
    const nav = useNavigate()
    const { user, isLoading: pending } = useAuth()
    return (
        <div>
            <Fade top duration={2500}>
                <div className='main-nav'>
                    <div className='nav_links p-2 bg-light'>
                        <Link color="teal" as={RouterLink} to='/' fontWeight="bold">
                            <div className='logo'>
                                <span className='logo1 '>cyber~wolf</span>
                                <span className='logo2 '>MEDIA SPHERE </span>
                            </div>
                        </Link>
                        <div className='d-flex align-items-center'>
                            <Link to={`/protected/profile/${user.id}`} as={RouterLink}>
                                <Button
                                    size="sm"
                                    className=' text-dark shadow-sm text-white'
                                    style={{ background: '#90CDFA' }}
                                >
                                    <PersonOutline fontSize='small' />
                                </Button>
                            </Link>
                            &nbsp;
                            <Button
                                colorScheme="teal"
                                size="sm"
                                onClick={logout}
                                isLoading={isLoading}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>



    );
}

export default Nav;