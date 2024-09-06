import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/TestComponents/Alert";
import Button from "./components/TestComponents/Button";
import ListGroup from "./components/TestComponents/ListGroup";
import SingleComponent from "./components/SingleComponent/SingleComponent";
import "./App.css";
import SingleRecord from "./components/SingleRecord/SingleRecord";
import DayRecordTitle from "./components/DayRecordTitle/DayRecordTitle";
import DayRecordTotal from "./components/DayRecordTotal/DayRecordTotal";
import RecordEachDay from "./components/RecordEachDay/RecordEachDay";
import MainPage from "./components/MainPage/MainPage";
import PageTitle from "./components/PageTitle/PageTitle";
import Footer from "./components/Footer/Footer";
import Details from "./components/Details/Details";
import Add from "./components/Add/Add";
import AddCalculator from "./components/AddCalculator/AddCalculator";
import AddCalculatorCalendar from "./components/AddCalculatorCalendar/AddCalculatorCalendar";
import DetailsDeleteConfirm from "./components/DetailsDeleteConfirm/DetailsDeleteConfirm";
import AddButton from "./components/AddButton/AddButton";
import DateSelector from "./components/DateSelector/DateSelector";
import DateSelectorYearly from "./components/DateSelectorYearly/DateSelectorYearly";

// interface Item {
//   _id: string;
//   category: string;
//   emoji: string;
//   value: number;
//   inputDate: string;
//   note?: string;
//   isExpenditure: boolean;
// }

function App() {
  // const cities = ["Shanghai", "Paris", "New York", "Tokyo"];
  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };
  // return (
  //   <div>
  //     <ListGroup
  //       items={cities}
  //       headings="Cities"
  //       onSelectItem={handleSelectItem}
  //     />
  //   </div>
  // );

  // const text = "This is your primary alert";
  // return (
  //   <div className="alert alert-primary">
  //     <Alert>
  //       This is <h1>another</h1> alert
  //     </Alert>
  //   </div>
  // );

  // const [alertVisible, setAlertVisibility] = useState(false);

  // const handleClickBtn = () => {
  //   setAlertVisibility(true);
  // };

  // const handleAlertClose = () => {
  //   setAlertVisibility(false);
  // };

  // return (
  //   <div>
  //     {alertVisible && (
  //       <Alert onClose={handleAlertClose}>This is a random alert message</Alert>
  //     )}
  //     <Button color="danger" onClick={handleClickBtn}>
  //       Tap to see alert
  //     </Button>
  //   </div>
  // );

  // const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5001/records")
  //     .then((response) => setRecords(response.data))
  //     .catch((err) => console.error(`Error fetching data: ${err}`));
  // }, []);

  const date = new Date().toString();

  // return (
  //   <div>
  //     {/* <Add /> */}
  //     <MainPage />
  //     {/* <Details
  //       category={"Transportation"}
  //       amount={90}
  //       isExpenditure={false}
  //       time={new Date(2021, 0)}
  //       note={"Shuttle to school"}
  //       emoji="🐶"
  //     /> */}
  //     {/* <SingleComponent
  //       emoji="🐶"
  //       title="Test"
  //       desc="This is a desc"
  //       isMonetaryValue={false}
  //       isExpenditure={false}
  //     /> */}
  //   </div>
  //   // <div>
  //   //   <h1>Records</h1>
  //   //   <ul>
  //   //     {records.map((record) => (
  //   //       <li key={record._id}>
  //   //         <h3>{record.category}</h3>
  //   //         <p>{record.emoji}</p>
  //   //       </li>
  //   //     ))}
  //   //   </ul>
  //   // </div>
  // );

  // ----------- route ---------------
  return (
    // <DateSelector />
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<Details />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;

