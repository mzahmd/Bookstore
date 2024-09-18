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
import CreateBookForm from "./CreateBookForm";

const AddIcon = () => "+";
const CloseIcon = () => "X";

export default function CreateDrawerForm({ fetchBooks }: { fetchBooks: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={onOpen} colorScheme="teal">
        Add a new Book
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a new Book</DrawerHeader>

          <DrawerBody>
            <CreateBookForm fetchBooks={fetchBooks}/>
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
