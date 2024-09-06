import React, { useEffect, useState } from "react";
import classes from "./DateSelector.module.css";
import DateSelectorYearly from "../DateSelectorYearly/DateSelectorYearly";
import DateSelectorMonthly from "../DateSelectorMonthly/DateSelectorMonthly";

interface DateSelectorProps {
  records: { [year: number]: { [month: number]: any } };
  yearMonthToDisplay: (selectedYear: number, selectedMonth: number) => void;
  setShowDateSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateSelector = ({
  records,
  yearMonthToDisplay,
  setShowDateSelector,
}: DateSelectorProps) => {
  const [title, setTitle] = useState("View by Year");
  const [showMonth, setShowMonth] = useState(false);

  const handleDisplays = () => {
    if (title === "View by Year") {
      setTitle("View by Month");
    } else {
      setTitle("View by Year");
    }
  };

  useEffect(() => {
    if (title === "View by Year") {
      setShowMonth(false);
    } else {
      setShowMonth(true);
    }
  }, [title]);

  const yearMonthSelection = (selectedYear: number, selectedMonth: number) => {
    // console.log(selectedYear, selectedMonth, "in here");
    return yearMonthToDisplay(selectedYear, selectedMonth);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title} onClick={handleDisplays}>
        {title}
      </div>
      <div className={classes.message}>
        Tap to switch between different display
      </div>
      <div>
        {showMonth ? (
          <DateSelectorMonthly
            records={records}
            yearMonthSelection={yearMonthSelection}
            setShowDateSelector={setShowDateSelector}
          />
        ) : (
          <DateSelectorYearly
            records={records}
            yearMonthSelection={yearMonthSelection}
            setShowDateSelector={setShowDateSelector}
          />
        )}
      </div>
    </div>
  );
};

export default DateSelector;

