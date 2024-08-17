import propTypes from "prop-types";

const FormRow = ({ children, style = {}, display = "grid", ...props }) => {
  const defaultStyle = {
    gridColumn: "span 2",
    gap: "1ch",
    display: children.filter((child) => child).length < 2 ? "flex" : display,
    gridTemplateColumns: "subgrid",
    justifyContent: "center",
    ...style,
  };
  return (
    <div style={defaultStyle} {...props}>
      {children}
    </div>
  );
};

FormRow.propTypes = {
  children: propTypes.array.isRequired,
  style: propTypes.object,
  display: propTypes.string,
};

export default FormRow;
