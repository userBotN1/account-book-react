import DayRecordTotal from "../DayRecordTotal/DayRecordTotal";
import classes from "./RecordEachDay.module.css";

interface MonthRecordProps {
  records: [];
}

const MonthRecord = ({ records }: MonthRecordProps) => {
  const recordsElements = [];

  // records.forEach((record) => {
  //   recordsElements.push(
  //     <li>
  //       <DayRecordTotal oneRecord={record} />
  //     </li>
  //   );
  // });
  return (
    <div className={classes.container}>
      <ul className={classes.monthList}>
        <li>
          <DayRecordTotal></DayRecordTotal>
        </li>
        <li>
          <DayRecordTotal></DayRecordTotal>
        </li>
        <li>
          <DayRecordTotal></DayRecordTotal>
        </li>
        {/* {recordsElements} */}
      </ul>
    </div>
  );
};

export default MonthRecord;

