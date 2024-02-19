import React from "react";
import { url } from "../url";
import { Avatar } from "@radix-ui/themes";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
const ProfileImage = ({ dp, name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Avatar
        onClick={onOpen}
        className="cursor-pointer"
        src={url + "public/dp/" + dp}
        fallback={name?.substring(0, 2)}
        radius="full"
        size="8"
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInRight"
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <Avatar
            onClick={onOpen}
            src={url + "public/dp/" + dp}
            fallback={name?.substring(0, 2)}
            radius="full"
          />
          <ModalCloseButton
            style={{
              backgroundColor: "white",
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileImage;
