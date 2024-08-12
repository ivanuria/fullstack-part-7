const Anecdote = ({ anecdote }) => {
  const { content, author, info, votes } = anecdote
  return (
    <>
      <h2 style={ { width: 'fit-content', marginInline: 'auto' } }>
        "{ content }"
        <br />
        <span style={ { fontSize: '.75em', textAlign: 'right', width: '100%', display:'block' } }>by { author }</span>
      </h2>
      <p>has { votes } votes</p>
      <p>For more information visit <a target='_blank' href={ info }>{ info }</a></p>
    </>
  )
}

export default Anecdote