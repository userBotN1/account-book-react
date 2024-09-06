import React, { useState } from "react";
import classes from "./DetailsEdit.module.css";
import AddCalculator from "../AddCalculator/AddCalculator";
import { useNavigate } from "react-router-dom";

interface DetailsEditProps {
  category: string;
  emoji: string;
  isExpenditure: boolean;
  note: string;
  amount: number;
  time: string;
  _id: string;
}

const DetailsEdit = ({
  category,
  emoji,
  isExpenditure,
  note,
  amount,
  time,
  _id,
}: DetailsEditProps) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const handleEditDetails = () => {
    console.log("edit");
    setShowCalculator(true);
  };

  const navigateToMainPage = useNavigate();

  const onClose = () => {
    navigateToMainPage("/", {});
  };

  return (
    <div className={classes.container}>
      <button className={classes["edit-btn"]} onClick={handleEditDetails}>
        Edit
      </button>
      {showCalculator && (
        <AddCalculator
          category={category}
          emoji={emoji}
          isExpenditure={isExpenditure}
          isEditRequest={true}
          note={note}
          amount={amount}
          time={time}
          _id={_id}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default DetailsEdit;

