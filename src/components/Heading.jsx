import "./Heading.css";
import PropTypes from "prop-types";

export default function Heading(props) {
  const darkStyle = {
    color: props.darkTheme ? "var(--light)" : "black",
  };
  return (
    <div className="heading">
      <h1 style={darkStyle}>Tenzies!</h1>
      <p style={darkStyle}>
        match all <span className="special">{props.count}</span> of your dice to
        the <span className="special">same</span> number
      </p>
    </div>
  );
}

Heading.propTypes = {
  count: PropTypes.number.isRequired,
  darkTheme: PropTypes.bool,
};
