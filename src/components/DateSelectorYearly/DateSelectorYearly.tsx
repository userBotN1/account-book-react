import React from "react";
import classes from "./DateSelectorYearly.module.css";

interface DateSelectorYearlyProps {
  records: { [year: number]: { [month: number]: any } };
  yearMonthSelection: (selectedYear: number, selectedMonth: number) => void;
  setShowDateSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateSelectorYearly = ({
  records,
  yearMonthSelection,
  setShowDateSelector,
}: DateSelectorYearlyProps) => {
  const decideIndicator = (year: number) => {
    if (year in records) {
      return <span className={classes.indicator}>*</span>;
    }
    return <span className={classes.indicator}></span>;
  };

  const generateYears = () => {
    let year = new Date().getFullYear();
    const content = [];

    for (let i = 0; i < 10; i++) {
      content.push(
        <li className={classes["date-selector-li"]}>
          <span className={classes.year}>{year}</span>
          {decideIndicator(year)}
        </li>
      );
      year -= 1;
    }

    return content;
  };

  const checkDictContainsRecord = (selectedYear: number) => {
    if (selectedYear in records) {
      setShowDateSelector(false);
      return yearMonthSelection(selectedYear, -1);
    }
    return alert("No record found for selected year");
  };

  const handleSelection = (event: React.MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLDataListElement;
    if (target && target.tagName === "SPAN") {
      checkDictContainsRecord(+target.textContent!);
    }
  };

  return (
    <div className={classes.container}>
      <ul className={classes["date-selector-ul"]} onClick={handleSelection}>
        {generateYears()}
      </ul>
    </div>
  );
};

export default DateSelectorYearly;

