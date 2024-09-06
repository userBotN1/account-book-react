import classes from "./PageTitle.module.css";

interface PageTitleProps {
  selectedYear: number;
  selectedMonth: number;
  range: "daily" | "weekly" | "monthly" | "yearly";
}

const PageTitle = ({ range, selectedYear, selectedMonth }: PageTitleProps) => {
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
  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weeks = ["First", "Second", "Third", "Fourth", "Fifth"];

  let selectedDate = new Date();
  if (selectedMonth === -1) {
    selectedDate = new Date(selectedYear, 0);
  } else {
    selectedDate = new Date(selectedYear, selectedMonth);
  }

  const year = selectedDate.getFullYear();
  const fullMonth = fullMonths[selectedDate.getMonth()];
  const abbMonth = months[selectedDate.getMonth()];

  const daily = () => {
    const date = selectedDate.getDate().toString();
    return ["Today", `${abbMonth} ${date}`];
  };

  const weekly = () => {
    const firstDayOfMonth = new Date(year, selectedDate.getMonth(), 1);

    const firstDayOfWeek = firstDayOfMonth.getDay();

    const startOfWeek = new Date(firstDayOfMonth);
    startOfWeek.setDate(firstDayOfMonth.getDate() - firstDayOfWeek);

    const diffInDays = Math.floor(
      (selectedDate.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekNumber = Math.floor(diffInDays / 7) + 1;

    const startDateOfWeek = new Date(startOfWeek);
    startDateOfWeek.setDate(startOfWeek.getDate() + (weekNumber - 1) * 7);

    const endDateOfWeek = new Date(startDateOfWeek);
    endDateOfWeek.setDate(startDateOfWeek.getDate() + 6);

    const startDateOfWeekStr = startDateOfWeek.toDateString().split(" ")[2];
    const endDateOfWeekStr = endDateOfWeek.toDateString().split(" ")[2];

    return [
      `${weeks[weekNumber - 1]} week of ${fullMonth}, ${year}`,
      `${abbMonth} ${startDateOfWeekStr} - ${abbMonth} ${endDateOfWeekStr}`,
    ];
  };

  const monthly = () => {
    const lastDay = new Date(year, selectedDate.getMonth() + 1, 0)
      .toDateString()
      .split(" ")[2];

    return [`${fullMonth}, ${year}`, `${abbMonth} 1 - ${abbMonth} ${lastDay}`];
  };

  const yearly = () => {
    return [year, `Jan. 1 - Dec. 31`];
  };

  const pipeline = () => {
    if (range === "daily") {
      return daily();
    } else if (range === "weekly") {
      return weekly();
    } else if (range === "monthly") {
      return monthly();
    } else {
      return yearly();
    }
  };

  return (
    <div className={classes.container}>
      <span className={classes.summary}>{pipeline()[0]}</span>
      <span className={classes.details}>{pipeline()[1]}</span>
    </div>
  );
};

export default PageTitle;

