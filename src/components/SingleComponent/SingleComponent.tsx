import classes from "./SingleComponent.module.css";

interface SingleComponentProps {
  emoji?: string;
  title?: string;
  desc: string | number;
  isMonetaryValue: boolean;
  isExpenditure: boolean;
}

const SingleComponent = ({
  emoji,
  title,
  desc,
  isExpenditure,
  isMonetaryValue,
}: SingleComponentProps) => {
  const categoryEmoji = {
    housing: {
      emoji: "🏠",
    },
    gift: {
      emoji: "🎁",
    },
    others: {
      emoji: "🎃",
    },
    dining: {
      emoji: "🍽",
    },
    transportation: {
      emoji: "🚌",
    },
    grocery: {
      emoji: "🧻",
    },
    game: {
      emoji: "🎮",
    },
    clothing: {
      emoji: "👗",
    },
    travel: {
      emoji: "✈️",
    },
    hotel: {
      emoji: "🏨",
    },
    pet: {
      emoji: "🐶",
    },
    transfer: {
      emoji: "💸",
    },
    study: {
      emoji: "💡",
    },
    medical: {
      emoji: "🏥",
    },
    creative: {
      emoji: "🤯",
    },
    refund: {
      emoji: "🤑",
    },
    wage: {
      emoji: "💰",
    },
    partTime: {
      emoji: "👨‍💻",
    },
    wealthManagement: {
      emoji: "🧾",
    },
  };
  const stringnifyAmount = (desc: string, isExpenditure: boolean) => {
    const str = `$${desc.toString()}`;
    if (isExpenditure) {
      return `-${str}`;
    } else {
      return str;
    }
  };

  const decideEmoji = (
    isMonetaryValue: boolean,
    isExpenditure: boolean,
    desc: string | number
  ) => {
    if (isMonetaryValue) {
      if (isExpenditure) {
        return "💸";
      } else {
        return "💰";
      }
    } else {
      const descStr = desc.toString().toLowerCase();
      return emoji;
    }
  };
  const decideTitle = (isExpenditure: boolean) => {
    if (isExpenditure) {
      return "Expenditure";
    } else {
      return "Income";
    }
  };

  const formatDesc = (desc: string | number) => {
    if (typeof desc === "string") {
      return desc.toString().charAt(0).toUpperCase() + desc.slice(1);
    }
  };
  return (
    <div className={classes.container}>
      <span className={classes.emoji}>
        {decideEmoji(isMonetaryValue, isExpenditure, desc)}
      </span>
      <span className={classes.category}>
        {isMonetaryValue ? decideTitle(isExpenditure) : title}
      </span>
      <span className={classes.desc}>
        {isMonetaryValue
          ? stringnifyAmount(desc.toString(), isExpenditure)
          : formatDesc(desc)}
      </span>
    </div>
  );
};

export default SingleComponent;

