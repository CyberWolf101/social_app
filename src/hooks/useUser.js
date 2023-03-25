import { useToast } from "@chakra-ui/react";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../config";


export function useUser(id) {
    const q = query(doc(db, "users", id))
    const [user, isLoading] = useDocumentData(q)
    return { user, isLoading };
}
export function useUpdateAvatar(uid, onClose) {
    const nav = useNavigate()
    const [file, setFile] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()

    async function updateAvatar() {
        if (!file) {
            toast({
                title: "Select an image werey",
                status: 'error',
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            return;
        }
        setLoading(true)
        const fileRef = ref(storage, "avatars/" + uid)  //if we dont add the user id, when similar names enter, the previous one will be over written so we make the file name in this case to be the user id
        await uploadBytes(fileRef, file)
        const avatarUrl = await getDownloadURL(fileRef)

        const docRef = doc(db, "users", uid)
        await updateDoc(docRef, { avatar: avatarUrl })
        toast({
            title: "Profile Updated",
            status: 'success',
            isClosable: true,
            position: "top",
            duration: 2000,
        })
        onClose()
        nav(0)
        setLoading(false)

    }

    return {
        setFile,
        updateAvatar,
        isLoading,
        fileURL: file && URL.createObjectURL(file)  //is a js built in function that allows us to create url path
    };
    //the code will breake if we don't do the first check cus file is null at the start
}

export const useUsers = () => {
    const [users, isLoading] = useCollectionData(collection(db, "users"))
    return { users, isLoading }
}