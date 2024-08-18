import axios from 'axios'
import { headers } from './crud'

export const createComment = async (id, content) => { // ????
  const baseUrl = `/api/blogs/${id}/comments`
  const updatedContent = await axios.post(baseUrl, { content }, { headers: headers() })
  return await updatedContent.data
}

export default {  }