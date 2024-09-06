import React, { useEffect, useState, useRef } from "react";
import classes from "./AddCalculator.module.css";
import AddCalculatorCalendar from "../AddCalculatorCalendar/AddCalculatorCalendar";
import axios from "axios";

interface AddCalculatorProps {
  category: string;
  emoji: string;
  isExpenditure: boolean;
  onClose: () => void;
  isEditRequest?: boolean;
  note?: string;
  amount?: number;
  time?: string;
  _id?: string;
}

const AddCalculator = ({
  category,
  emoji,
  isExpenditure,
  onClose,
  isEditRequest = false,
  note,
  amount,
  time,
  _id,
}: AddCalculatorProps) => {
  const [clickedBtn, setClickedBtn] = useState("");
  const [showCalendar, setCalendar] = useState(false);
  const [arithArr, setArithArr] = useState<string[]>(
    amount ? amount.toString().split("") : []
  );
  const [selectedDateStr, setSelectedDateStr] = useState(
    time ? new Date(+time).toString() : new Date().toString()
  );
  const [inputText, setInputText] = useState(note ? note : "");

  const calValDisplayRef = useRef<HTMLSpanElement | null>(null);

  const arrToNumHelper = (arr: string[]) => {
    arr = arr.reverse();
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
      res += parseInt(arr[i]) * Math.pow(10, i);
    }
    return res;
  };

  const formatCategoryName = (desc: string) => {
    const formattedStr = [];
    let startIndex = 0;
    let endIndex = 0;

    while (endIndex < desc.length) {
      if (desc.charAt(endIndex) !== desc.charAt(endIndex).toLowerCase()) {
        const temp = desc.slice(startIndex, endIndex);
        formattedStr.push(temp);
        startIndex = endIndex;
      }
      endIndex++;
    }
    formattedStr.push(desc.slice(startIndex, endIndex));

    let res = "";
    for (let i = 0; i < formattedStr.length; i++) {
      res += formattedStr[i][0].toUpperCase() + formattedStr[i].slice(1) + " ";
    }
    return res.slice(0, res.length - 1);
  };

  const arrToNum = (arr: string[]) => {
    let negativeNum = false;
    let startInd = 0;
    let endInd = 0;

    if (arr[0] === "-") {
      negativeNum = true;
      startInd = 1;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === ".") {
        endInd = i;
        break;
      } else {
        endInd += 1;
      }
    }

    const intPart = arr.slice(startInd, endInd);
    const decPart = arr.slice(endInd + 1);
    const intRes = arrToNumHelper(intPart);
    const decRes = arrToNumHelper(decPart) / Math.pow(10, decPart.length);
    const res = intRes + decRes;

    if (negativeNum) {
      return res * -1;
    }
    return res;
  };

  const arithCal = (firstNum: number, secondNum: number, sign: string) => {
    let res = 0;
    if (sign === "+") {
      res += firstNum + secondNum;
    } else if (sign === "-") {
      res += firstNum - secondNum;
    }
    return res.toFixed(2);
  };

  const seperateNum = (arr: string[]) => {
    let i = 0;
    if (arr[i] === "-") {
      i += 1;
    }

    for (i; i < arr.length; i++) {
      if (arr[i] === "+" || arr[i] === "-") {
        const first = arr.slice(0, i);
        const second = arr.slice(i + 1, arr.length);
        const sign = arr.slice(i, i + 1);
        return [first, second, sign];
      }
    }

    return [arr, ["0"], ["+"]];
  };

  const detectMulSigns = () => {
    let containMulSign = false;
    let i = 0;
    if (arithArr[i] === "-") {
      i += 1;
    }

    for (i; i < arithArr.length; i++) {
      if (arithArr[i] === "+" || arithArr[i] === "-") {
        if (!containMulSign) {
          containMulSign = true;
        } else {
          return i;
        }
      }
    }

    return -1;
  };

  const calHelper = (containMulSign: number) => {
    const numArr = seperateNum(arithArr.slice(0, containMulSign));
    const firstNum = arrToNum(numArr[0]);
    const secondNum = arrToNum(numArr[1]);

    const res = arithCal(firstNum, secondNum, numArr[2][0]);
    const resArr = res.split("");

    if (
      arithArr[containMulSign] === "=" ||
      arithArr[containMulSign] === "calAddBtn"
    ) {
      setArithArr([...resArr]);
    } else {
      setArithArr([...resArr, ...arithArr.slice(containMulSign)]);
    }
  };

  const cleanArithArr = () => {
    if (
      arithArr[arithArr.length - 2] === "+" ||
      arithArr[arithArr.length - 2] === "-"
    ) {
      setArithArr(arithArr.slice(0, -2));
    } else {
      calHelper(arithArr.length - 1);
    }
  };

  const openCalendar = () => {
    setCalendar(true);
  };

  const closeCalendar = () => {
    setCalendar(false);
  };

  const processDate = (dateArr: string) => {
    setCalendar(false);
    setSelectedDateStr(new Date(Date.parse(dateArr)).toString());
  };

  const processAddUpdateRecord = () => {
    cleanArithArr();

    let val = 0;
    if (arithArr.includes("+") || arithArr.includes("-")) {
      const arithArrCopy = arithArr.slice(0, arithArr.length - 1);
      const numArr = seperateNum(arithArrCopy.slice(0, arithArrCopy.length));
      const firstNum = arrToNum(numArr[0]);
      const secondNum = arrToNum(numArr[1]);
      val = +arithCal(firstNum, secondNum, numArr[2][0]);
    } else {
      const valStr = arithArr.join("");
      val = parseFloat(valStr);
    }

    if (isNaN(val)) {
      alert("Enter a valid amount");
      setArithArr([]);
      return;
    }

    if (val < 0) {
      alert("Entered amount must be greater than 0");
      return;
    }

    const newRecord = {
      category: category,
      emoji: emoji,
      value: val,
      inputDate: Date.parse(selectedDateStr),
      note: inputText,
      isExpenditure: isExpenditure,
    };

    if (isEditRequest) {
      axios
        .patch(`http://localhost:5001/records/${_id}`, newRecord)
        .then((response) => {
          alert("Record updated successfully");
          onClose();
        })
        .catch((err) => console.error("Error updating record:", err));
    } else {
      axios
        .post("http://localhost:5001/records", newRecord)
        .then((response) => {
          alert("Record added successfully");

          onClose();
        })
        .catch((err) => console.error("Error adding record:", err));
    }
  };

  useEffect(() => {
    if (calValDisplayRef.current) {
      let displayArr = [];

      for (let i = 0; i < arithArr.length; i++) {
        if (
          arithArr[i] !== "calBackBtn" &&
          arithArr[i] !== "calAddBtn" &&
          arithArr[i] !== "="
        ) {
          displayArr.push(arithArr[i]);
        }
      }

      calValDisplayRef.current.textContent = `$${displayArr.join("")}`;
    }
  }, [arithArr]);

  useEffect(() => {
    if (arithArr.length === 0) return;
    const lastAdded = arithArr[arithArr.length - 1];

    if (lastAdded === "+" || lastAdded === "-") {
      if (
        arithArr.length === 1 &&
        (arithArr[0] === "+" || arithArr[0] === "-")
      ) {
        setArithArr(["0", lastAdded]);
      } else if (
        arithArr.length > 1 &&
        (arithArr[arithArr.length - 2] === "-" ||
          arithArr[arithArr.length - 2] === "+")
      ) {
        setArithArr((prevArr) => [...prevArr.slice(0, -2), lastAdded]);
      } else {
        const containMulSign = detectMulSigns();
        if (containMulSign !== -1) {
          calHelper(containMulSign);
        }
      }
    } else if (lastAdded === "=") {
      cleanArithArr();
    } else if (lastAdded === "calBackBtn" && arithArr.length > 0) {
      setArithArr((prevArr) => prevArr.slice(0, -2));
    } else if (lastAdded === "calAddBtn") {
      // cleanArithArr();
      processAddUpdateRecord();
    }
  }, [arithArr]);

  const handleInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleCalBtnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target && target.tagName === "BUTTON") {
      setClickedBtn(target.textContent || "");
      const targetContent = target.textContent || "";

      if (target.id !== "calCalBtn") {
        if (target.id === "calBackBtn" || target.id === "calAddBtn") {
          setArithArr((prevArr) => [...prevArr, target.id]);
        } else {
          setArithArr((prevArr) => [...prevArr, targetContent]);
        }
      }
    }
  };

  return (
    <div className={classes["container"]}>
      <div
        className={[classes["money"], classes["money_grid-layout"]].join(" ")}
      >
        <span
          className={[
            classes["money_emoji"],
            classes["money_emoji_grid-layout"],
          ].join(" ")}
        >
          {emoji}
        </span>
        <span
          className={[
            classes["money_category-desc"],
            classes["money_category-desc_grid-layout"],
          ].join(" ")}
        >
          {formatCategoryName(category)}
        </span>
        <span
          ref={calValDisplayRef}
          className={[
            classes["money_value"],
            classes["money_value_grid-layout"],
          ].join(" ")}
        >
          $
        </span>
      </div>
      <div className={[classes["note"], classes["note_grid-layout"]].join(" ")}>
        <span
          className={[
            classes["note_emoji"],
            classes["note_emoji_grid-layout"],
          ].join(" ")}
        >
          📝
        </span>
        <span
          className={[
            classes["note_category-desc"],
            classes["note_category-desc_grid-layout"],
          ].join(" ")}
        >
          Note
        </span>
        <input
          type="text"
          className={[
            classes["note_value"],
            classes["note_value_grid-layout"],
          ].join(" ")}
          name="customNote"
          onChange={handleInputText}
          value={inputText}
        />
      </div>
      <div className={classes["calculator"]} onClick={handleCalBtnClick}>
        <button type="button">7</button> <button type="button">8</button>
        <button type="button">9</button>
        <button
          type="button"
          id="calCalBtn"
          className={classes["calculator_date-btn"]}
          onClick={openCalendar}
        >
          📆
        </button>
        <button type="button">4</button> <button type="button">5</button>
        <button type="button">6</button>
        <button type="button" id="calMinusBtn">
          -
        </button>
        <button type="button">1</button> <button type="button">2</button>
        <button type="button">3</button>
        <button type="button" id="calPlusBtn">
          +
        </button>
        <button type="button">.</button> <button type="button">0</button>
        <button type="button" id="calBackBtn">
          🔙
        </button>
        <button type="button" id="calEqualBtn">
          =
        </button>
        <button className={classes["update-btn"]} type="button" id="calAddBtn">
          {isEditRequest ? "Update" : "Add"}
        </button>
      </div>
      {showCalendar && (
        <AddCalculatorCalendar
          clickCancel={closeCalendar}
          clickConfirm={processDate}
        />
      )}
    </div>
  );
};
export default AddCalculator;

