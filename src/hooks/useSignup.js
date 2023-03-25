import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import NameExist from '../Logic/nameExist';

export function UseSignup() {

    const navigate = useNavigate()
    const toast = useToast()        //used for alerts
    const [isLoading, setLoading] = useState(false)
    //so basically what we want is to add a user in the auth section and create one is the firestore collection at the same time so that registered users can match the ones in our fire store collection
    async function signup({
        username,
        email,
        password,
        redirectTo = '/protected/dashboard'
    }) {
        setLoading(true);
        const userNameExist = await NameExist(username)    //we want to use this function to check if user name exist
        if (userNameExist) {
            toast({
                title: "Username already exists",
                status: "error", //for red
                isClosable: true,
                position: "top",
                duration: 5000,
            });
            setLoading(false);
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password) //now here the user isnadded to the firebase auth collection and next we want the user in the firestore
                await setDoc( doc(db, "users", res.user.uid), {  //we get the id from the res variable, we use setDoc instead of add doc cus we want to set the id when a user is created
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    avatar: "",
                    date: Date.now(),
                })
                toast({
                    title: "Account Created!",
                    status: "success",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                });
                navigate('/protected/dashboard')

            } catch (error) {
                toast({
                    title: "Signed up Failed",
                    description: error.message,
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                });
            } finally {
                setLoading(false)
            }
        }

    }

    return {signup, isLoading}
}
