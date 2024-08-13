import propTypes from 'prop-types'

const Anecdote = ({ anecdote }) => {
  const { content, author, info, votes } = anecdote
  return (
    <>
      <h2 style={ { width: 'fit-content', marginInline: 'auto' } }>
      &quot;{ content }&quot;
        <br />
        <span style={ { fontSize: '.75em', textAlign: 'right', width: '100%', display:'block' } }>by { author }</span>
      </h2>
      <p>has { votes } votes</p>
      <p>For more information visit <a target='_blank' href={ info } rel="noreferrer">{ info }</a></p>
    </>
  )
}

Anecdote.propTypes = {
  anecdote: propTypes.object
}

export default Anecdote