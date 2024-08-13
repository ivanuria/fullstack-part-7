import propTypes from 'prop-types'

const AnecdoteList = ({ anecdotes=[] }) => (
  <>
    <h2>Anecdotes</h2>
    <ul>
      { anecdotes.map(anecdote => (
        <li key={anecdote.id} >
          <a href={`/anecdotes/${anecdote.id}`}>
           {anecdote.content}
          </a>
        </li>
      ) ) }
    </ul>
  </>
)

AnecdoteList.propTypes = {
  anecdotes: propTypes.array
}

export default AnecdoteList