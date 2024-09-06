import React, { useState } from "react";
import classes from "./AddSingleComponent.module.css";
import AddCalculator from "../AddCalculator/AddCalculator";
import { useNavigate } from "react-router-dom";

interface AddSingleComponentProps {
  emoji: string;
  desc: string;
  isExpenditure: boolean;
  uniqueId: string;
}

const AddSingleComponent = ({
  emoji,
  desc,
  isExpenditure,
}: AddSingleComponentProps) => {
  const [openCalculator, setOpenCalculator] = useState(false);
  const navigateToMainPage = useNavigate();

  const formatDesc = (desc: string) => {
    const formattedStr = [];
    let startIndex = 0;
    let endIndex = 0;

    while (endIndex < desc.length) {
      if (desc.charAt(endIndex) !== desc.charAt(endIndex).toLowerCase()) {
        const temp = desc.slice(startIndex, endIndex);
        formattedStr.push(temp);
        startIndex = endIndex;
      }
      endIndex++;
    }
    formattedStr.push(desc.slice(startIndex, endIndex));

    let res = "";
    for (let i = 0; i < formattedStr.length; i++) {
      res += formattedStr[i][0].toUpperCase() + formattedStr[i].slice(1) + " ";
    }
    return res.slice(0, res.length - 1);
  };

  const handleOpenCalculator = () => {
    setOpenCalculator(true);
  };

  const handleCloseCalculator = () => {
    setOpenCalculator(false);
    navigateToMainPage("/", {});
  };

  return (
    <>
      <div className={classes["category-container"]}>
        <button className={classes.btn} onClick={handleOpenCalculator}>
          <span className={classes.emoji}>{emoji}</span>
        </button>
        <span className={classes.desc}>{formatDesc(desc)}</span>
      </div>
      <div className={classes["calculator-container"]}>
        {openCalculator && (
          <AddCalculator
            category={desc}
            emoji={emoji}
            isExpenditure={isExpenditure}
            onClose={handleCloseCalculator}
          />
        )}
      </div>
      {openCalculator && (
        <div
          onClick={handleCloseCalculator}
          className={classes["overlay"]}
        ></div>
      )}
    </>
  );
};

export default AddSingleComponent;

