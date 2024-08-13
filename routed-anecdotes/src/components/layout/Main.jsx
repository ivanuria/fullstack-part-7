import Container from "./Container"
import propTypes from 'prop-types'

const Main = ({ children, ...props }) => {
  return (
    <main { ...props }>
      <Container>
        { children }
      </Container>
    </main>
  )
}

Main.propTypes = {
  children: propTypes.any.isRequired
}

export default Main