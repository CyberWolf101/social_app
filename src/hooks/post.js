import { position, useToast } from '@chakra-ui/react';
import { uuidv4 } from '@firebase/util';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../config';
import useAuth from './auth';
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import swal from 'sweetalert';

export function UsePost() {
    const [pending, setPending] = useState(false)
    const { user, isLoading: authLoading } = useAuth()

    const toast = useToast()
    const addPost = async (post) => {
        setPending(true);
        const uid = user.id;
        const id = uuidv4()     //we need thus so that all the id will be differnt
        try {
            await setDoc(doc(db, 'posts', id), {  //set doc again cuse we want to control the id we add to the posts
                ...post,                          //we spread here cus one person can have morethan 1 posts if not, each post will be deleting if they have same id
                uid,                              //this represents the user id
                id,                               //this represents the doc id
                date: Date.now(),
                likes: []
            });
            toast({
                title: "Post added",
                status: 'success',
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            setPending(false);
        } catch (error) {
            toast({
                title: "Failed",
                description: error.message,
                status: 'error',
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            setPending(false);
        }

    }
    return { addPost, pending }
}

export function useShowPost() {
    const q = query(collection(db, "posts"), orderBy('date', 'desc'))
    const [posts, isLoading, error] = useCollectionData(q);  //the react-firebase-hooks package
    if (error) throw error;

    return { posts, isLoading };
}



export function useFetchPostById(id) {
    const q = query(doc(db, "posts", id))
    const [post, isLoading, error] = useDocumentData(q);  //the react-firebase-hooks package

    return { post, isLoading };
}
// export async function useFetchLikes(id) {
//     const q = query(collection(db, "posts"), where("uid", "==", id))
//   const d = await getDocs(q)
   
//     return { d };
// }

export const useDeletePost = (id) => {
    const [loading, setLoading] = useState()
    const toast = useToast()

    async function deletePost() {
        setLoading(true);

        swal({
            text: "Are you sure you want to delete this post?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {   //we are nesting our async function inside this swal function
                if (willDelete) {
                    async function d() {
                        await deleteDoc(doc(db, "posts", id))

                        //next we delete all the comments associated with that post
                        const q = query(collection(db, "comments"), where("postID", "==", id));
                        const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((doc) => {
                            deleteDoc(doc.ref)
                        })

                        //after deleteing
                        toast({
                            title: "post deleted!",
                            status: 'info',
                            isClosable: true,
                            position: "top",
                            duration: 2000,
                        })
                        setLoading(false);
                    }
                    d();

                } else {
                    swal("cancelled", {
                        icon: "error"
                    });
                    setLoading(false);
                }
            });



        //delete comments




    }
    return { deletePost, loading }
}

export function useSpecificPosts(uid) {
    const q = query(collection(db, "posts"), orderBy('date', 'desc'), where("uid", "==", uid))
    const [posts, isLoading, error] = useCollectionData(q);  //the react-firebase-hooks package
    if (error) throw error;

    return { posts, isLoading };
}