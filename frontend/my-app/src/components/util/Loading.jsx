import React from "react";
import { CircularProgress } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div>
      <CircularProgress color="blue.500" isIndeterminate />
    </div>
  );
};

export default Loading;
