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
      const temp = fn[i].fn(new Date(), currTime);
      if (temp > 0) {
        setTime(temp);
        setType(fn[i].type);
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    getTime(
      { fn: differenceInDays, type: "Days" },
      { fn: differenceInHours, type: "Hours" },
      { fn: differenceInMinutes, type: "Minutes" },
      { fn: differenceInSeconds, type: "Seconds" }
    );
  }, [currTime]);

  return (
    <p className="text-xs dark:text-gray-200 ">
      <span className="font-semibold mr-1 ">{time}</span>
      {type} ago
    </p>
  );
};

export default Time;
