import { redirect } from "react-router-dom";
import DayRecordTitle from "../DayRecordTitle/DayRecordTitle";
import SingleRecord from "../SingleRecord/SingleRecord";
import classes from "./DayRecordTotal.module.css";
import { useState } from "react";
// import { RecordType } from "../../../models/Record";

interface RecordType {
  _id: string;
  category: string;
  emoji: string;
  value: number;
  inputDate: string;
  note: string;
  isExpenditure: boolean;
}

interface DayRecordTotalProps {
  records: RecordType[];
}

const DayRecordTotal = ({ records }: DayRecordTotalProps) => {
  const currentTime = new Date();

  const recordsToDateDict = () => {
    let recordsDict: { [date: string]: RecordType[] } = {};

    records.forEach((record) => {
      const month = new Date(+record.inputDate).getMonth() + 1;
      const date = new Date(+record.inputDate).getDate();
      const dateStr = `${month}-${date}`;

      if (!recordsDict[dateStr]) {
        recordsDict[dateStr] = [];
      }

      recordsDict[dateStr].push(record);
    });

    return recordsDict;
  };

  const calValue = (records: RecordType[]) => {
    let expenditureAmt = 0;
    let incomeAmt = 0;

    records.forEach((record) => {
      if (record.isExpenditure) {
        expenditureAmt += record.value;
      } else {
        incomeAmt += record.value;
      }
    });

    return [expenditureAmt, incomeAmt];
  };

  const displayRecords = (
    record: RecordType,
    index: number,
    recordsLength: number
  ) => {
    return (
      <li>
        <SingleRecord
          _id={record._id}
          emoji={record.emoji}
          category={record.category}
          time={record.inputDate}
          amount={record.value}
          isExpenditure={record.isExpenditure}
          note={record.note}
          firstInList={index === 0 ? classes.firstInList : ""}
          lastInList={index === recordsLength - 1 ? classes.lastInList : ""}
        />
      </li>
    );
  };

  const displayDays = () => {
    let recordsDict: { [date: string]: RecordType[] } = {};
    recordsDict = recordsToDateDict();

    const dates = Object.keys(recordsDict);
    dates.sort().reverse();

    const results = [];

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const records = recordsDict[date];

      const [expenditureAmt, incomeAmt] = calValue(records);
      const dateInfo = new Date(+records[0].inputDate);

      results.push(
        <>
          <div className={classes.title}>
            <DayRecordTitle
              time={dateInfo}
              expAmount={expenditureAmt}
              incAmount={incomeAmt}
            ></DayRecordTitle>
          </div>
          <ul className={classes.list}>
            {records
              .sort((a, b) => +b.inputDate - +a.inputDate)
              .map((record, index) =>
                displayRecords(record, index, records.length)
              )}
          </ul>
        </>
      );
    }
    return results;
  };

  return <>{displayDays()}</>;
};

export default DayRecordTotal;

