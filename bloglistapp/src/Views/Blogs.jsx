import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setInitialBlogs } from '../reducers/blogs'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { SwapVert } from '@mui/icons-material'

const Blog = ({ blog }) => {
  return (
    <TableRow >
      <TableCell><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></TableCell>
      <TableCell>{ blog.author }</TableCell>
      <TableCell>{ blog.likes }</TableCell>
    </TableRow>
  )
}

const Blogs = () => {
  const dispatch = useDispatch()
  const [sorted, setSorted] = useState()
  const blogs = [...useSelector(state => state.blogs)]

  useEffect(() => {
    dispatch(setInitialBlogs())
  }, [])

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
      <Typography
        component='h2'
        variant='h4'
        sx={{
          textAlign: 'center',
          marginBlockEnd: '1em'
        }}
      >
        Blogs List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
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
    </Box>
  )
}

export default Blogs
