import React, { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Bg from "../../public/assets/images/assets-cached.jpg";
const Auth = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user) return navigate("/");
  }, []);
  return (
    <div className={`  p-4  `}>
      <div className=" ">
        <Tabs variant={"soft-rounded"}>
          <TabList
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tab>Signup</Tab>
            <Tab>Login</Tab>
          </TabList>
          <div>
            <TabPanels
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TabPanel>
                <Signup />
              </TabPanel>
              <TabPanel>
                <Login />
              </TabPanel>
            </TabPanels>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
