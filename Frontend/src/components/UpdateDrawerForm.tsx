import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import UpdateBookForm from "./UpdateBookForm";

const CloseIcon = () => "X";

interface Props {
  fetchBooks: () => void;
  isbn: string;
}

export default function UpdateDrawerForm({ fetchBooks, isbn }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Update</Button>
      <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update a new Book</DrawerHeader>
          <DrawerBody>
            <UpdateBookForm fetchBooks={fetchBooks} isbn={isbn} />
          </DrawerBody>
          <DrawerFooter>
            <Button
              leftIcon={<CloseIcon />}
              onClick={onClose}
              colorScheme="teal"
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
