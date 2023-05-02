import PropTypes from "prop-types";
import "./Die.css";

export default function Die(props) {
  const isHeldStyle = {
    backgroundColor: "var(--sub-color)",
    color: "white",
    boxShadow: "inset 4px 4px 5px rgba(0, 0, 0, 0.15)",
  };
  return (
    <div
      className="die"
      onClick={props.toggleHold}
      style={props.isHeld ? isHeldStyle : {}}
    >
      {props.value}
    </div>
  );
}

Die.propTypes = {
  value: PropTypes.number.isRequired,
  toggleHold: PropTypes.func.isRequired,
  isHeld: PropTypes.bool.isRequired,
};
