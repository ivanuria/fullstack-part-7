import PropTypes from 'prop-types'

const Providers = ({ providers, children }) => {
  const recursiveRender = providers => {
    if (providers.length === 1) {
      return providers[0]
    }
    let Provider
    let args = {}
    if (typeof providers[0] === 'object') {
      Provider = providers[0][0]
      args = providers[0][1]
    } else {
      Provider = providers[0]
    }
    return <Provider {...args}>{recursiveRender(providers.slice(1))}</Provider>
  }
  return <>{recursiveRender([...providers, children])}</>
}

Providers.propTypes = {
  providers: PropTypes.array.isRequired,
  children: PropTypes.any.isRequired,
}

export default Providers
