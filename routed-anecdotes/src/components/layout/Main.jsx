import Container from "./Container"

const Main = ({ children, ...props }) => {
  return (
    <main { ...props }>
      <Container>
        { children }
      </Container>
    </main>
  )
}

export default Main