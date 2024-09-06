import React, { useState } from "react";
import classes from "./DetailsPageTitle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailsDeleteConfirm from "../DetailsDeleteConfirm/DetailsDeleteConfirm";

interface DetailsPageTitleProps {
  _id: string;
}

const DetailsPageTitle = ({ _id }: DetailsPageTitleProps) => {
  const mainPageNavigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteRecord = async () => {
    try {
      await axios.delete(`http://localhost:5001/records/${_id}`);
      mainPageNavigate("/", {});
      alert("Record deleted successfully");
    } catch (err) {
      console.error("Failed to delete record: ", err);
    }
  };

  const handleNavToMain = () => {
    mainPageNavigate("/", {});
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className={classes.container}>
        <span className={classes["back-btn"]} onClick={handleNavToMain}>
          <img src="/src/assets/back-button.svg" />
        </span>
        <span className={classes.title}>Details</span>
        <span className={classes["delete-btn"]} onClick={handleShowConfirm}>
          <img src="/src/assets/delete-button.svg" />
        </span>
      </div>
      {showConfirm && (
        <DetailsDeleteConfirm
          clickCancel={handleCloseConfirm}
          handleDeleteRecord={handleDeleteRecord}
        />
      )}
      {showConfirm && (
        <div className={classes.overlay} onClick={handleCloseConfirm} />
      )}
    </>
  );
};

export default DetailsPageTitle;

