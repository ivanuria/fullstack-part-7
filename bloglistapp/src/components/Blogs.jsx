import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setInitialBlogs } from "../reducers/blogs"
import Blog from "./Blog"

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
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </>
  )
}

export default Blogs