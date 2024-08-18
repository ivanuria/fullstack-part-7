import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInitialBlogs } from '../reducers/blogs'

const Blog = ({ blog }) => {
  return (
    <tr>
      <td><a href={`/blogs/${blog.id}`}>{ blog.title }</a></td>
      <td>{ blog.author }</td>
      <td>{ blog.likes }</td>
    </tr>
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
    <>
      <button onClick={e => handleSortBlogs()}>
        Sort Blogs{' '}
        {sorted === 'higherFirst'
          ? 'from lowest to highest'
          : 'from highest to lowest'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
        </tbody>
      </table>

    </>
  )
}

export default Blogs
