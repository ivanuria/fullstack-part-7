import { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  useMatch,
  useNavigate
} from 'react-router-dom'
//Components
import Header from './components/layout/Header'
import Main from './components/layout/Main'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Notification from './components/Notification'
// Views
import About from './components/Views/About'
import AnecdoteList from './components/Views/Anecdotes'
import NewAnecdote from './components/Views/NewAnecdote'
import Anecdote from './components/Views/Anecdote'
//Styles
import './styles/main.css'


const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  useEffect(() => {
    setTimeout(() => setNotification(''), 5000)
  }, [notification])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`New Anecdote '${anecdote.content}' created`)
  }

  const routes = [
    {
      'to': '/',
      'label': 'Anecdotes',
      'element': <AnecdoteList anecdotes={anecdotes} />
    },
    {
      'to': '/about',
      'label': 'About',
      'element': <About />
    },
    {
      'to': '/anecdotes/new',
      'label': 'New Anecdore',
      'element': <NewAnecdote addNew={addNew} />
    }
  ]

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id.toString() === id.toString())

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const matchAnecdote = useMatch('/anecdotes/:id')
  const anecdote = matchAnecdote
    ? anecdoteById(matchAnecdote.params.id)
    : null

  return (
    <>
    <Header>
      <Menu menuItems={routes} />
    </Header>
    <Main>
        <Notification notification={ notification } />
        <h1>Software anecdotes</h1>
        <Routes>
          {
            routes.map(
              route => <Route key={route.to} path={ route.to } element={ route.element } />
            )
          }
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={ anecdote } />} />
        </Routes>
      </Main>
    <Footer style={ { fontSize: '.8rem' } } />
    </>
  )
}

export default App
