import React from "react";
import classes from "./DetailsNote.module.css";

interface DetailsNoteProp {
  desc: string;
}
const DetailsNote = ({ desc }: DetailsNoteProp) => {
  return (
    <div className={classes.container}>
      <span className={classes.title}>📝 Note</span>
      <span className={classes.desc}>{desc}</span>
    </div>
  );
};

export default DetailsNote;

