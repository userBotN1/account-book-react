import React from "react";
import classes from "./AddButton.module.css";

interface AddButtonProps {
  navToAdd: () => void;
}
const AddButton = ({ navToAdd }: AddButtonProps) => {
  return (
    <div className={classes.container}>
      <button className={classes.btn} onClick={navToAdd}>
        Add
      </button>
    </div>
  );
};

export default AddButton;

