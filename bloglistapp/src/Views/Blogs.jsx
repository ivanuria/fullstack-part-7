import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { SwapVert, Add as AddIcon } from '@mui/icons-material'
import H2 from '../components/H2'

const Blog = ({ blog }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>{blog.likes}</TableCell>
    </TableRow>
  )
}

const Blogs = () => {
  const navigate = useNavigate()
  const [sorted, setSorted] = useState()
  const blogs = [...useSelector(state => state.blogs)]

  const handleSortBlogs = () => {
    setSorted(sorted === 'higherFirst' ? 'lowerFirst' : 'higherFirst')
  }

  if (sorted) {
    blogs.sort((a, b) => a.likes - b.likes)
    if (sorted === 'higherFirst') {
      blogs.reverse()
    }
  }

  return (
    <Box>
      <H2>Blogs List</H2>
      <TableContainer
        component={Paper}
        sx={{
          marginBlockEnd: '2.5rem',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                Likes
                <Button onClick={e => handleSortBlogs()}>
                  <SwapVert />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        color='primary'
        aria-label='add blog'
        onClick={() => navigate('/blogs/new')}
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '50%',
        }}
      >
        <AddIcon color='primary.contrastText' />
      </Fab>
    </Box>
  )
}

export default Blogs
