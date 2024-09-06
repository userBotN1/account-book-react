import React, { useEffect, useState } from "react";
import classes from "./Details.module.css";
import SingleComponent from "../SingleComponent/SingleComponent";
import DetailsDate from "../DetailsDate/DetailsDate";
import DetailsNote from "../DetailsNote/DetailsNote";
import DetailsPageTitle from "../DetailsPageTitle/DetailsPageTitle";
import { useLocation } from "react-router-dom";
import DetailsEdit from "../DetailsEdit/DetailsEdit";

interface DetailsProps {
  category: string;
  amount: number;
  isExpenditure: boolean;
  time: Date;
  note: string;
  emoji: string;
}

const Details = () => {
  const [showNote, setShowNote] = useState(false);

  const location = useLocation();
  const { _id, emoji, category, isExpenditure, time, amount, note } =
    location.state;

  const handleShowNote = () => {
    if (note !== "") {
      setShowNote(true);
    }
  };

  useEffect(() => {
    handleShowNote();
  }, []);

  return (
    <>
      <DetailsPageTitle _id={_id} />
      <div className={classes.container}>
        <div className={classes.firstRow}>
          <SingleComponent
            emoji={emoji}
            title="Category"
            desc={category}
            isMonetaryValue={false}
            isExpenditure={isExpenditure}
          />
          <SingleComponent
            title="Expenditure"
            desc={amount}
            isMonetaryValue={true}
            isExpenditure={isExpenditure}
          />
        </div>
        <div className={classes.date}>
          <DetailsDate time={new Date(+time)} />
        </div>
        {showNote && (
          <div className={classes.note}>
            <DetailsNote desc={note} />
          </div>
        )}
      </div>
      <DetailsEdit
        category={category}
        emoji={emoji}
        isExpenditure={isExpenditure}
        note={note}
        amount={amount}
        time={time}
        _id={_id}
      />
    </>
  );
};

export default Details;

