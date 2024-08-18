import { Link } from "react-router-dom";
import propTypes from "prop-types";

export const MenuLink = ({ children, to, className, ...props }) => (
  <li className={className} {...props}>
    <Link className={`${className}-link`} to={to}>
      {children}
    </Link>
  </li>
);

MenuLink.propTypes = {
  children: propTypes.string.isRequired,
  to: propTypes.string.isRequired,
  className: propTypes.string,
};

const Menu = ({ menuItems = [], className = "main-menu", ...props }) => {
  const menuStyle = {
    listStyleType: "none",
    paddingInlineStart: 0,
    display: "flex",
    flexFlow: "row wrap",
    gap: "3ch",
  };
  return (
    <nav className={className} {...props}>
      <menu className={`${className}__menu`} style={menuStyle}>
        {menuItems.map((item) => (
          <MenuLink
            key={item.to}
            className={`${className}__menu-item`}
            to={item.to}
          >
            {item.label}
          </MenuLink>
        ))}
      </menu>
    </nav>
  );
};

Menu.propTypes = {
  menuItems: propTypes.array,
  className: propTypes.string,
};

export default Menu;
