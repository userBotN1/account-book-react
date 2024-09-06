import { useState } from "react";
import Details from "../Details/Details";
import classes from "./SingleRecord.module.css";
import { Navigate, useNavigate } from "react-router-dom";

interface SingleRecordProps {
  _id: string;
  emoji: string;
  category: string;
  time: string;
  amount: number;
  isExpenditure: boolean;
  note: string;
  firstInList?: string;
  lastInList?: string;
}

const SingleRecord = ({
  _id,
  emoji,
  category,
  time,
  amount,
  note,
  isExpenditure,
  firstInList,
  lastInList,
}: SingleRecordProps) => {
  const detailsPageNavigate = useNavigate();

  const formatTime = (timestamp: string) => {
    const time = new Date(+timestamp);

    const hours = time.getHours().toString().padStart(2, "0");
    const mins = time.getMinutes().toString().padStart(2, "0");
    return hours + ":" + mins;
  };
  const formatAmount = (amount: number, isExpenditure: boolean) => {
    const amountStr = amount.toFixed(2).toString();
    if (isExpenditure) {
      return `- $${amountStr}`;
    } else {
      return `+ $${amountStr}`;
    }
  };

  const formatCategory = (desc: string) => {
    desc = desc.charAt(0).toLowerCase() + desc.slice(1);
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

  const handleShowDetails = () => {
    detailsPageNavigate("/details", {
      state: { _id, category, amount, isExpenditure, time, note, emoji },
    });
  };

  return (
    <>
      <div
        className={`${classes.container} ${firstInList} ${lastInList}`}
        onClick={handleShowDetails}
      >
        <span className={classes.emoji}>{emoji}</span>
        <span className={classes.category}>{formatCategory(category)}</span>
        <span className={classes.time}>{formatTime(time)}</span>
        <span className={classes.amount}>
          {formatAmount(amount, isExpenditure)}
        </span>
      </div>
    </>
  );
};

export default SingleRecord;

