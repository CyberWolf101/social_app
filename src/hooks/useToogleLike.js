import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { db } from '../config';

export const UseToogleLike = ({ id, liked, uid }) => {
    const [isLoading, setLoading] = useState(false);
    const toggleLike = async () => {
        setLoading(true);
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, {
            likes: liked ? arrayRemove(uid) : arrayUnion(uid)
        });
        setLoading(false);
    }
    return { toggleLike, isLoading }
};

