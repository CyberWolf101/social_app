import { useToast } from '@chakra-ui/react';
import { uuidv4 } from '@firebase/util';
import { collection, deleteDoc, doc, orderBy, query, setDoc, where } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import swal from 'sweetalert';
import { db } from '../config';
import useAuth from './auth';

export const UseAddcomment = ({ postID, uid }) => {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    async function addComment(comment) {
        setLoading(true);
        const id = uuidv4();
        const date = Date.now();

        const docRef = doc(db, "comments", id)
        await setDoc(docRef, { comment, id, postID, date, uid })
        toast({
            title: "Comment added!",
            status: 'success',
            isClosable: true,
            position: "top",
            duration: 3000,
        })
        setLoading(false)
    }
    return { addComment, isLoading }
};


export const useComment = (postID) => {
    const q = query(collection(db, "comments"), where("postID", "==", postID), orderBy("date", "desc"));
    const [comments, isLoading, error] = useCollectionData(q);
    if (error) throw error;

    return { comments, isLoading, error };
}

export const useDeleteComment = (id) => {
    const [isLoading, setLoading] = useState(false)
    
    function deleteComment() {
        setLoading(true);
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const docRef = doc(db, "comments", id);
                    deleteDoc(docRef)
                    swal("Your comment has been deleted!", {
                        icon: "success",
                    });
                    setLoading(false);
                } else {
                    swal("cancelled",{
                        icon: "error"
                    });
                    setLoading(false);
                }
            });




    }

    return { deleteComment, isLoading };
}