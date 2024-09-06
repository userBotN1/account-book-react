import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <button className={classes.button}>
        <img src="/src/assets/details.svg" />
        <span>Details</span>
      </button>
      <button className={classes.button}>
        <img src="/src/assets/trend.svg" />
        <span>Trend</span>
      </button>
      <button className={classes.button}>
        <img src="/src/assets/profile.svg" />
        <span>My</span>
      </button>
    </div>
  );
};

export default Footer;

