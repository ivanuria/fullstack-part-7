import Container from "./Container";
import propTypes from "prop-types";

const Footer = ({ children, ...props }) => {
  return (
    <footer {...props}>
      <Container>{children}</Container>
    </footer>
  );
};

Footer.propTypes = {
  children: propTypes.any.isRequired,
};

export default Footer;
