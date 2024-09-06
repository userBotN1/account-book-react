import React from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import classes from "./Add.module.css";
import AddSingleComponent from "../AddSingleComponent/AddSingleComponent";
import MainPage from "../MainPage/MainPage";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [displayExpense, setExpense] = useState(true);
  const [displayCategoryName, setCategoryName] = useState("Expenditure");
  const navigateToMainPage = useNavigate();

  const generateCategory = () => {
    const categoryEmoji = {
      housing: {
        emoji: "🏠",
        isExpenditure: true,
      },
      gift: {
        emoji: "🎁",
        isExpenditure: true,
      },
      others: {
        emoji: "🎃",
        isExpenditure: true,
      },
      dining: {
        emoji: "🍽",
        isExpenditure: true,
      },
      transportation: {
        emoji: "🚌",
        isExpenditure: true,
      },
      grocery: {
        emoji: "🧻",
        isExpenditure: true,
      },
      game: {
        emoji: "🎮",
        isExpenditure: true,
      },
      clothing: {
        emoji: "👗",
        isExpenditure: true,
      },
      travel: {
        emoji: "✈️",
        isExpenditure: true,
      },
      hotel: {
        emoji: "🏨",
        isExpenditure: true,
      },
      pet: {
        emoji: "🐶",
        isExpenditure: true,
      },

      study: {
        emoji: "💡",
        isExpenditure: true,
      },
      medical: {
        emoji: "🏥",
        isExpenditure: true,
      },
      creative: {
        emoji: "🤯",
        isExpenditure: true,
      },
      transfer: {
        emoji: "💸",
        isExpenditure: false,
      },
      refund: {
        emoji: "🤑",
        isExpenditure: false,
      },
      wage: {
        emoji: "💰",
        isExpenditure: false,
      },
      partTime: {
        emoji: "👨‍💻",
        isExpenditure: false,
      },
      wealthManagement: {
        emoji: "🧾",
        isExpenditure: false,
      },
    };
    const expenses = [];
    const incomes = [];

    for (const [key, value] of Object.entries(categoryEmoji)) {
      if (value.isExpenditure) {
        expenses.push(
          <AddSingleComponent
            emoji={value.emoji}
            desc={key}
            isExpenditure={value.isExpenditure}
            uniqueId={uuid()}
          ></AddSingleComponent>
        );
      } else {
        incomes.push(
          <AddSingleComponent
            emoji={value.emoji}
            desc={key}
            isExpenditure={value.isExpenditure}
            uniqueId={uuid()}
          ></AddSingleComponent>
        );
      }
    }

    return [expenses, incomes];
  };

  const navToMainPage = () => {
    navigateToMainPage("/", {});
  };

  return (
    <>
      <div className={classes.title}>
        <button className={classes["home-btn"]} onClick={navToMainPage}>
          <img src="./src/assets/home-button.svg" />
        </button>
        <button
          className={[classes.btn, classes["left-btn"]].join(" ")}
          onClick={() => {
            setExpense(true);
            setCategoryName("Expenditure");
          }}
        >
          <img src="./src/assets/left-arrow-btn.svg" />
        </button>

        <span className={classes["title-name"]}>{displayCategoryName}</span>

        <button
          className={[classes.btn, classes["right-btn"]].join(" ")}
          onClick={() => {
            setExpense(false);
            setCategoryName("Income");
          }}
        >
          <img src="./src/assets/right-arrow-btn.svg" />
        </button>
      </div>

      {displayExpense ? (
        <div className={classes.container}>
          {generateCategory()[0].map((item) => (
            <div key={item.props.uniqueId}>{item}</div>
          ))}
        </div>
      ) : (
        <div className={classes.container}>
          {generateCategory()[1].map((item) => (
            <div key={item.props.uniqueId}>{item}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default Add;

