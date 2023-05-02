import "./Heading.css";
import PropTypes from "prop-types";

export default function Heading(props) {
  return (
    <div className="heading">
      <h1>Tenzies!</h1>
      <p>
        match all <span className="special">{props.count}</span> of your dice to
        the <span className="special">same</span> number
      </p>
    </div>
  );
}

Heading.propTypes = {
  count: PropTypes.number.isRequired,
};
