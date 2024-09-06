import React from "react";

import classes from "./DetailsDate.module.css";

interface DetailsDateProp {
  time: Date;
}

const DetailsDate = ({ time }: DetailsDateProp) => {
  const stringifyTime = (time: Number) => {
    return time.toString().padStart(2, "0");
  };
  const formatTime = (time: Date) => {
    const month = stringifyTime(time.getMonth() + 1);
    const date = stringifyTime(time.getDate());
    const year = time.getFullYear().toString();
    const hour = stringifyTime(time.getHours());
    const minutes = stringifyTime(time.getMinutes());
    const seconds = stringifyTime(time.getSeconds());

    const timeStr = `${month}/${date}/${year} ${hour}:${minutes}:${seconds}`;
    return timeStr;
  };
  return (
    <div className={classes.container}>
      <span className={classes.title}>📅 Date</span>
      <span className={classes.date}>{formatTime(time)}</span>
    </div>
  );
};

export default DetailsDate;

