import React from "react";
import classes from "./DateSelectorMonthly.module.css";

interface DateSelectorMonthlyProps {
  records: { [year: number]: { [month: number]: any } };
  yearMonthSelection: (selectedYear: number, selectedMonth: number) => void;
  setShowDateSelector: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateSelectorMonthly = ({
  records,
  yearMonthSelection,
  setShowDateSelector,
}: DateSelectorMonthlyProps) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const decideIndicator = (year: number, month: number) => {
    if (year in records) {
      if (month in records[year]) {
        return <span className={classes["month-indicator"]}>*</span>;
      }
    }
    return <span className={classes["month-indicator"]}></span>;
  };

  const generateMonths = (year: number) => {
    const content = [];

    for (let i = 0; i < months.length; i++) {
      content.push(
        <div className={classes["month-container"]}>
          <span className={classes["month-info"]}>{months[i]}</span>
          {decideIndicator(year, i)}
        </div>
      );
    }

    return content;
  };

  const checkDictContainsRecord = (
    selectedYear: number,
    selectedMonth: number
  ) => {
    if (selectedYear in records) {
      if (selectedMonth in records[selectedYear]) {
        setShowDateSelector(false);
        return yearMonthSelection(selectedYear, selectedMonth);
      }
    }

    return alert("No record found for the selcted year and month");
  };

  const handleSelection = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    const selectedYearDiv = target.closest("[data-year]") as HTMLElement;
    const selectedYear = parseInt(
      selectedYearDiv.getAttribute("data-year")!,
      10
    );

    let selectedMonth = 0;
    if (target && target.tagName === "SPAN") {
      months.map((month, index) => {
        if (target.textContent === month) {
          selectedMonth = index;
        }
      });
    }

    checkDictContainsRecord(selectedYear, selectedMonth);
  };

  const generateYears = () => {
    let year = new Date().getFullYear();
    const content = [];

    for (let i = 0; i < 10; i++) {
      content.push(<div className={classes["year-container"]}>{year}</div>);
      content.push(
        <div
          className={classes["months-container"]}
          data-year={year}
          onClick={handleSelection}
        >
          {generateMonths(year)}
        </div>
      );
      year -= 1;
    }

    return content;
  };

  return <div className={classes.container}>{generateYears()}</div>;
};

export default DateSelectorMonthly;

