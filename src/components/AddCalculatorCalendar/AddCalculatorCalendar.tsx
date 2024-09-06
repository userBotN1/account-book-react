import React, { useEffect, useState } from "react";
import classes from "./AddCalculatorCalendar.module.css";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

interface AddCalculatorCalendarProps {
  clickCancel: () => void;
  clickConfirm: (date: string) => void;
}

const AddCalculatorCalendar = ({
  clickCancel,
  clickConfirm,
}: AddCalculatorCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const dateInput = document.querySelector(`.${classes["input-field"]}`);
    if (dateInput) {
      const fp = flatpickr(dateInput, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        onClose: (selectedDates, dateStr, instance) => {
          setSelectedDate(selectedDates[0].toISOString());
        },
      });
    }
  }, []);

  return (
    <>
      <div className={classes["container"]}>
        <button
          className={classes["cancel-btn"]}
          type="button"
          onClick={clickCancel}
        >
          Cancel
        </button>
        <button
          className={classes["confirm-btn"]}
          type="button"
          onClick={() => clickConfirm(selectedDate)}
        >
          Confirm
        </button>
        <input className={classes["input-field"]} type="text" id="datepicker" />
      </div>
      <div className={classes["overlay"]}></div>
    </>
  );
};

export default AddCalculatorCalendar;

