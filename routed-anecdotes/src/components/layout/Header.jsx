import Container from "./Container"
import propTypes from 'prop-types'

const Header = ({ children, ...props }) => {
  return (
    <header { ...props }>
      <Container>
        { children }
      </Container>
    </header>
  )
}

Header.propTypes = {
  children: propTypes.any.isRequired
}

export default Header