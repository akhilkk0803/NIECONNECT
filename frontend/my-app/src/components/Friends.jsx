import React from "react";
const Deptannouncment = [
  {
    deptName: "ise",
    message: "TEST 1",
  },
  {
    deptName: "ise",
    message: "TEST 1",
  },
  {
    deptName: "ise",
    message: "TEST 1",
  },
  {
    deptName: "ise",
    message: "TEST 1",
  },
];
const Clubsannouncment = [
  {
    clubName: "gdsc",
    message: "TEST 1",
  },
  {
    clubName: "issa",
    message: "TEST 1",
  },
  {
    clubName: "onyx",
    message: "TEST 1",
  },
  {
    clubName: "ieee",
    message: "TEST 1",
  },
];
const Friends = () => {
  return (
    <div className=" hidden md:block">
      <div className="">Dept Announcment</div>
      {Deptannouncment.map((el) => (
        <div
          className="dark:bg-gray-800 bg-gray-200 mt-2
        "
        >
          <p className="font-semibold">{el.deptName}</p>
          <p>{el.message}</p>
        </div>
      ))}
      <div className="">Club Announcment</div>
      {Clubsannouncment.map((el) => (
        <div
          className="dark:bg-gray-800 bg-gray-200 mt-2
        "
        >
          <p className="font-semibold">{el.clubName}</p>
          <p>{el.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Friends;
