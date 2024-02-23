import React, { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInSeconds,
  differenceInMinutes,
} from "date-fns";
const Time = ({ currTime }) => {
  const [time, setTime] = useState(1);
  const [type, setType] = useState("second");
  const getTime = (...fn) => {
    for (let i = 0; i < fn.length; i++) {
      const temp = fn[i](new Date(), currTime);
      if (temp > 0) {
        setTime(temp);
        console.log(fn[i].name.substring(12));
        setType(fn[i].name.substring(12));
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    getTime(
      differenceInDays,
      differenceInHours,
      differenceInMinutes,
      differenceInSeconds
    );
  }, [currTime]);

  return (
    <p className="text-xs dark:text-gray-200 ">
      <span className="font-semibold  ">{time}</span>
      {type} ago
    </p>
  );
};

export default Time;
