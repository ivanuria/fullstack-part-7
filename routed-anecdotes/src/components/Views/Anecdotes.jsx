const AnecdoteList = ({ anecdotes }) => (
  <>
    <h2>Anecdotes</h2>
    <ul>
      { anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>) }
    </ul>
  </>
)

export default AnecdoteList