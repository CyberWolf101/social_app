import { FormControl, Button, Input, Text, FormErrorMessage, Box, Center, Heading, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // npm install react-hook-form (helps in form validation :<)
import { Link as RouterLink } from 'react-router-dom';
import { emailValidate, passValidate, usernameValidate } from '../Logic/validate';
import { UseSignup } from '../hooks/useSignup';


export default function Signup() {
    const {signup, isLoading} = UseSignup()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()  //this will avoid us using states and onChange functions
    //handlesubmit comes from the react-hook-form it can take in a function to be executed and it saves use the stress of doing e.target.value
    console.log(errors)//the formstate grabs the errors we put in the validate.js when we submit

    const handleSignup = async (data) => {
        // the data object(from the react-hook-form package) will have the email and name property 
        // console.log(data)
        const success = await signup({
            username:data.username,
            email: data.email,
            password: data.password,
            redirectTo: '/'
        }); //remeber that our login function is expecting 3 arguments
        if (success) {
            reset() //to reset for and it comes from the react-hook-form
        }else{
        }
    }
    return (
        <div>
            <Center w='100%' h='100vh'>
                <Box mx="1" maxW='md' p='9' borderWidth="1px" borderRadius='lg'>
                    <Heading mb="4" size="lg" textAlign="center">
                        SIGNUP
                    </Heading>
                    <form onSubmit={handleSubmit(handleSignup)}>
                        <FormControl isInvalid={errors.email} py="2">
                            <Input type="email" placeholder='email' {...register('email', emailValidate)} /> {/*the first argument is the name we want to take in for the input field while the second is a function we create */}
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password} py="2">
                            <Input type="password" placeholder='password' {...register('password', passValidate)} />
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.username} py="2">
                            <Input type="text" placeholder='username' {...register('username', usernameValidate)} />
                            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                        </FormControl>
                        <Button mt='4'
                            type='submit'
                            colorScheme="teal"
                            size='sm'
                            w='full'
                            isLoading={isLoading}
                            loadingText="signing up"
                        >
                            Signup
                        </Button>
                    </form>
                    <Text align="center" mt='3'>

                        <Link
                            as={RouterLink}
                            to='/login'
                            color="teal"
                            textDecor="underline"
                            _hover={{ background: "teal.100" }}
                        >
                          Already have an account?
                        </Link>
                    </Text>

                </Box>
            </Center>
        </div>
    );
}

