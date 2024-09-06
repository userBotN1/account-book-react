import classes from "./DayRecordTitle.module.css";

interface DayRecordTitleProps {
  time: Date;
  expAmount: number;
  incAmount: number;
}
const DayRecordTitle = ({
  time,
  expAmount,
  incAmount,
}: DayRecordTitleProps) => {
  const formatTime = (time: Date) => {
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May.",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[time.getDay()];
    const month = months[time.getMonth()];
    const date = time.getDate().toString();
    return `${day}, ${month} ${date}`;
  };
  const formatAmount = (amount: number, isExpenditure: boolean) => {
    const amountStr = amount.toFixed(2).toString();
    if (isExpenditure) {
      return `💸 $${amountStr}`;
    } else {
      return `💰 $${amountStr}`;
    }
  };
  return (
    <div className={classes.container}>
      <span className={classes.time}>{formatTime(time)}</span>
      <span className={classes.expAmount}>{formatAmount(expAmount, true)}</span>
      <span className={classes.incAmount}>
        {formatAmount(incAmount, false)}
      </span>
    </div>
  );
};

export default DayRecordTitle;

