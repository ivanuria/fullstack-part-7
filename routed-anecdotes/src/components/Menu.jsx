import { Link } from 'react-router-dom'

export const MenuLink = ({ children, to, className, ...props }) => (
  <li className={ className } { ...props }>
    <Link className={ `${className}-link` } to={ to }>{ children }</Link>
  </li>
)

const Menu = ({ menuItems=[], className='main-menu', ...props }) => {
  const menuStyle = {
    listStyleType: 'none',
    paddingInlineStart: 0,
    display: 'flex',
    flexFlow: 'row wrap',
    gap: '3ch'
  }
  return (
    <nav className={ className } { ...props }>
      <menu className={ `${className}__menu` } style={ menuStyle }>
        {
          menuItems.map(
            item => <MenuLink key={ item.to } className={ `${className}__menu-item` } to={ item.to }>{ item.label }</MenuLink>
          )
        }
      </menu>
    </nav>
  )
}

export default Menu