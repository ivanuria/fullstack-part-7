import FooterLayout from './layout/Footer'
import propTypes from 'prop-types'

const Footer = ({ ...props }) => {
  delete props.children
  return (
    <FooterLayout { ...props }>
      Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </FooterLayout>
  )
}

Footer.propTypes = {
  children: propTypes.any
}

export default Footer