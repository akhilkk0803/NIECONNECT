import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      {/* <h1>{error.data.message} </h1>
      <h1>{error.status} </h1> */}Work in Progress !!! 
    </div>
  );
};

export default Error;
