import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
    , FormControl, FormLabel,
    Button,
    Spinner,
    Box,
} from '@chakra-ui/react'
import Avatar from '../components/Avatar';
import useAuth from '../hooks/auth'
import { useUpdateAvatar } from '../hooks/useUser';



export default function ModalDisplay({ isOpen, onClose }) {

    const { user, isLoading } = useAuth()
    const { setFile, updateAvatar, isLoading: fileLoading, fileURL } = useUpdateAvatar(user?.id, onClose)

    function handleChange(e) {
        // console.log(e.target.files)
        setFile(e.target.files[0])   //so when ever we set the file in that input, it will be updated here
    }
    if (isLoading) return <Spinner />
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: "center" }}>
                            <Box mx="">
                                <Avatar user={user} size="xl" overideAvatar={fileURL} />
                            </Box>
                            <Box>
                                <FormControl py="3">
                                    <FormLabel>Change Display Picture</FormLabel>
                                    <input type='file' accept='image/*' onChange={handleChange} />
                                </FormControl>
                                {/* accept="/*" makes sure we only accept image files */}
                            </Box>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            w='full' my="6"
                            loadingText="uploading"
                            onClick={updateAvatar}
                            isLoading={fileLoading}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}