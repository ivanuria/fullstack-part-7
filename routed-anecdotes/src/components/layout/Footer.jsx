import Container from "./Container"

const Footer = ({ children, ...props }) => {
  return (
    <footer { ...props }>
      <Container>
        { children }
      </Container>
    </footer>
  )
}

export default Footer