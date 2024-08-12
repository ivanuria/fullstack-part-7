import Container from "./Container"

const Header = ({ children, ...props }) => {
  return (
    <header { ...props }>
      <Container>
        { children }
      </Container>
    </header>
  )
}

export default Header