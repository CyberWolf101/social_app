import React from 'react';
import {  ScaleFade, Slide, SlideFade, Spinner } from '@chakra-ui/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Bounce} from "react-reveal"
import TypeWriterEffect from 'react-typewriter-effect';


import useAuth from '../hooks/auth';
import Nav2 from '../components/nav2';

function Home() {
    const location = useLocation()
    console.log(location.pathname)
    const { user, isLoading: pending } = useAuth()
    const nav = useNavigate()

    if (pending) return <Spinner />
    return (
        <div className='home_page'>
            <Nav2 />
            <Bounce duration={1500} bottom>
                <center className='quote'>
                    <h3>IT'S SOCIAL MEDIA DAY!!</h3>
                </center>
            </Bounce>
            <center>
                <section className='info '>
                    Once upon a time, in a world where information was king, there existed a powerful entity known as the Media Sphere
                </section>
            </center>

            <br />
            <br />
            <br />
            <center>
                <div style={{ width: '90%' }}>
                    <Button w="full" colorScheme="teal" onClick={() => nav('/protected/dashboard')}>
                        CONTINUE
                    </Button>
                </div>

            </center>
        </div>
    );
}

export default Home;


{/* <TypeWriterEffect

cursorColor="#3F3D56"
text="Once upon a time, in a world where information was king, there existed a powerful entity known as the Media Sphere. Sorry you wasted your time reading that, click he button below."
typeSpeed={60}
/> */}