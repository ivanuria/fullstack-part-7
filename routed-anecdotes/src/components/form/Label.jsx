import propTypes from "prop-types";

const Label = ({ children, htmlFor, ...props }) => {
  return (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

Label.propTypes = {
  children: propTypes.string.isRequired,
  htmlFor: propTypes.string,
};

export default Label;
