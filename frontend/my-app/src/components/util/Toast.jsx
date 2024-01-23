import React from "react";
import { useToast } from "@chakra-ui/react";
const Toast = ({ title, desc, status }) => {
  const toast = useToast();
  console.log("toast");
  const createToast = () => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };
  createToast();
  return <>dd</>;
};

export default Toast;
