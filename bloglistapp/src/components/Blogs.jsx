import { useEffect } from 'react'
import useRequests from '../services/requests.js'
import Blog from "./Blog"

const Blogs = ({ sorted }) => {
  const [createBlog, readBlog, updateBlog, deleteBlog] = useRequests('/api/blogs', ['blogs'])
  const blogsRequest = readBlog()

  let blogs = blogsRequest.data || []

  const removeBlog = async id => {
    const toDelete = blogs.find(blog => blog.id === id)
    if (
      window.confirm(`Remove blog '${toDelete.title}' by '${toDelete.author}'`)
    ) {
      await deleteBlog(id)
    }
  }

  if (blogsRequest.isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  console.log(sorted)
  blogs = [...blogs].sort((a, b) => {
    return a.likes - b.likes
  })
  if (!sorted || sorted === 'higherFirst') {
    blogs.reverse()
  }

  return (
    <>
    {blogs.map(blog => blog && (
      <Blog
        key={blog.id}
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={removeBlog}
      />
    ))}
    </>
  )
}

export default Blogs