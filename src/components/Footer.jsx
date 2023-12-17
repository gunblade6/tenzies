import "./Footer.css";
import PropTypes from "prop-types";
export default function Footer(props) {
  return (
    <footer style={{ color: props.darkTheme ? "var(--light)" : "black" }}>
      Made with ☕ by{" "}
      <a
        href="https://urboifox.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        Fox
      </a>
    </footer>
  );
}

Footer.propTypes = {
  darkTheme: PropTypes.bool,
};
