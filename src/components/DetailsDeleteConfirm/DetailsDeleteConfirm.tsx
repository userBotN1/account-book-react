import React from "react";
import classes from "./DetailsDeleteConfirm.module.css";

interface DetailsDeleteConfirmProps {
  clickCancel: () => void;
  handleDeleteRecord: () => void;
}

const DetailsDeleteConfirm = ({
  clickCancel,
  handleDeleteRecord,
}: DetailsDeleteConfirmProps) => {
  return (
    <div className={classes.container}>
      <span className={classes.message}>Do you want to delete the record?</span>
      <button
        className={[classes.btn, classes["confirm-btn"]].join("")}
        onClick={handleDeleteRecord}
      >
        Confirm
      </button>
      <button
        className={[classes.btn, classes["cancel-btn"]].join("")}
        onClick={clickCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default DetailsDeleteConfirm;

