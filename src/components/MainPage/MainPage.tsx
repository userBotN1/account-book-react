import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import PageTitle from "../PageTitle/PageTitle";
import SingleComponent from "../SingleComponent/SingleComponent";
import classes from "./MainPage.module.css";
import axios from "axios";
import DayRecordTotal from "../DayRecordTotal/DayRecordTotal";
import AddButton from "../AddButton/AddButton";
import { useNavigate } from "react-router-dom";
import DateSelector from "../DateSelector/DateSelector";

interface RecordType {
  _id: string;
  category: string;
  emoji: string;
  value: number;
  inputDate: string;
  note: string;
  isExpenditure: boolean;
}

const MainPage = () => {
  // const currentTime = new Date();
  const [records, setRecords] = useState<RecordType[]>([]);
  const [recordsLoaded, setRecordsLoaded] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [yearToDisplay, setYearToDisplay] = useState(new Date().getFullYear());
  const [monthToDisplay, setMonthToDisplay] = useState(new Date().getMonth());
  const [displayRange, setDisplayRange] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("monthly");

  const navigateToAdd = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/records")
      .then((response) => {
        setRecords(response.data);
        setRecordsLoaded(true);
      })
      .catch((err) => console.error(`Error fetching data: ${err}`));
  }, []);

  useEffect(() => {
    const footerDiv = document.querySelector(
      `.${classes.footer}`
    ) as HTMLElement;

    if (footerDiv) {
      let lastScrollTop = 0;

      window.addEventListener("scroll", function () {
        const currentScrollTop = window.scrollY;
        if (currentScrollTop > lastScrollTop) {
          footerDiv.style.display = "none";
        } else {
          footerDiv.style.display = "block";
        }

        lastScrollTop = currentScrollTop;

        if (
          window.innerHeight + currentScrollTop >=
          document.body.offsetHeight
        ) {
          footerDiv.style.display = "block";
        }
      });
    }
  }, []);

  const recordsToDict = () => {
    let recordsDict: { [year: number]: { [month: number]: RecordType[] } } = {};

    records.forEach((record) => {
      const year = new Date(+record.inputDate).getFullYear();
      const month = new Date(+record.inputDate).getMonth();

      if (!recordsDict[year]) {
        recordsDict[year] = {};
      }

      if (!recordsDict[year][month]) {
        recordsDict[year][month] = [];
      }

      recordsDict[year][month].push(record);
    });

    return recordsDict;
  };

  const filterRecords = (selectedYear: number, selectedMonth: number) => {
    if (!recordsLoaded) {
      return [];
    }

    const recordsDict = recordsToDict();

    if (selectedMonth !== -1) {
      return recordsDict[selectedYear][selectedMonth];
    }

    // Pack all records from the selected year into an array
    const selectedYearDict = recordsDict[selectedYear];
    const arr: RecordType[] = [];

    for (const [_, monthArr] of Object.entries(selectedYearDict)) {
      monthArr.forEach((record) => {
        arr.push(record);
      });
    }

    return arr;
  };

  const calTotalExpAndInc = (selectedYear: number, selectedMonth: number) => {
    const records = filterRecords(selectedYear, selectedMonth);

    let totalExpense = 0;
    let totalIncome = 0;
    records.forEach((record) => {
      if (record.isExpenditure) {
        totalExpense += record.value;
      } else {
        totalIncome += record.value;
      }
    });

    return [totalExpense, totalIncome];
  };

  const navToAdd = () => {
    navigateToAdd("/add", {});
  };

  const handleOpenDateSelector = () => {
    setShowDateSelector(true);
  };

  const handleCloseDateSelector = () => {
    setShowDateSelector(false);
  };

  const yearMonthToDisplay = (selectedYear: number, selectedMonth: number) => {
    setYearToDisplay(selectedYear);
    setMonthToDisplay(selectedMonth);
    if (selectedMonth === -1) {
      setDisplayRange("yearly");
    } else {
      setDisplayRange("monthly");
    }
  };

  return (
    <>
      <div className={classes.title}>
        <button
          className={classes["calendar-btn"]}
          onClick={handleOpenDateSelector}
        >
          <img src="/src/assets/calendar.svg" />
        </button>
        <div className={classes["title-info"]}>
          <PageTitle
            selectedYear={yearToDisplay}
            selectedMonth={monthToDisplay}
            range={displayRange}
          />
        </div>
      </div>
      <div className={classes.summary}>
        <SingleComponent
          emoji="💸"
          title="Expenditure"
          desc={calTotalExpAndInc(yearToDisplay, monthToDisplay)[0]}
          isMonetaryValue={true}
          isExpenditure={true}
        ></SingleComponent>

        <SingleComponent
          emoji="💸"
          title="Income"
          desc={calTotalExpAndInc(yearToDisplay, monthToDisplay)[1]}
          isMonetaryValue={true}
          isExpenditure={false}
        ></SingleComponent>
      </div>
      <div className={classes.details}>
        <DayRecordTotal
          records={filterRecords(yearToDisplay, monthToDisplay)}
        ></DayRecordTotal>
      </div>
      <div className={classes["add-btn"]}>
        <AddButton navToAdd={navToAdd} />
      </div>
      <div className={classes["date-selector-container"]}>
        {showDateSelector && (
          <DateSelector
            records={recordsToDict()}
            yearMonthToDisplay={yearMonthToDisplay}
            setShowDateSelector={setShowDateSelector}
          />
        )}
      </div>
      {showDateSelector && (
        <div className={classes.overlay} onClick={handleCloseDateSelector} />
      )}

      <div className={classes.footer}>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;

