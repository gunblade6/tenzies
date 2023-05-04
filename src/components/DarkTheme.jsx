import PropTypes from "prop-types";
import "./DarkTheme.css";

export default function DarkTheme(props) {
  return (
    <div className="darkTheme">
      <div
        className="themeToggle"
        onClick={props.toggleTheme}
        style={{
          backgroundColor: props.darkTheme
            ? "var(--light)"
            : "var(--background-color)",
        }}
      >
        <img
          className="sun"
          src={`/src/assets/sun${props.darkTheme ? "W" : "B"}.png`}
          alt="sun icon"
        />
        <img
          className="moon"
          src={`/src/assets/moon${props.darkTheme ? "W" : "B"}.png`}
          alt="moon icon"
        />
        <span
          style={{
            backgroundColor: props.darkTheme
              ? "var(--background-color)"
              : "var(--light)",
            left: props.darkTheme ? "calc(100% - 17px)" : "5px",
          }}
        ></span>
      </div>
    </div>
  );
}

DarkTheme.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool,
};
