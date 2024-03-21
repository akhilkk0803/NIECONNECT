import React from "react";
import { CircularProgress, Box } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress
        size="80px"
        color="blue.500"
        thickness="6px"
        trackColor="black.300"
        isIndeterminate
      />
    </Box>
  );
};

export default Loading;
