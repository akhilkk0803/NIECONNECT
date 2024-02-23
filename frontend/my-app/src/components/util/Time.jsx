import React from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInSeconds,
  differenceInMinutes,
} from "date-fns";
const Time = ({ currTime }) => {
  let time = 1;
  let type = "second";
  const getTime = (...fn) => {
    for (let i = 0; i < fn.length; i++) {
      const temp = fn[i](new Date(), currTime);
      if (temp > 0) {
        time = temp;
        console.log(fn);
        type = fn[i].name.substring(12);
        return true;
      }
    }
    return false;
  };
  getTime(
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds
  );
  return (
    <p className="text-xs dark:text-gray-200 ">
      <span className="font-semibold  ">{time} </span>"{type}" ago
    </p>
  );
};

export default Time;
