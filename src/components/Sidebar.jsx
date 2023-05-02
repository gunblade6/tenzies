import "./Sidebar.css";
import PropTypes from "prop-types";

export default function Sidebar(props) {
  const levels = new Array(3);
  for (let i = 0; i < levels.length; i++) {
    levels[i] = (i + 1) * 5;
  }
  const levelHolders = levels.map((e) => {
    return (
      <div
        onClick={() => props.changeDiceNum(e)}
        className={`levelHolder ${e === props.currNum ? "active" : ""}`}
        key={e}
      >
        {e}
      </div>
    );
  });
  return <div className="side">{levelHolders}</div>;
}
Sidebar.propTypes = {
  changeDiceNum: PropTypes.func.isRequired,
  currNum: PropTypes.number,
};
