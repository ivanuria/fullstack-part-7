import propTypes from 'prop-types'

const Container = ({ children }) => (
  <div className='container'>
    { children }
  </div>
)

Container.propTypes = {
  children: propTypes.any.isRequired
}

export default Container