import axios from 'axios'
import { headers } from './crud'

export const createComment = async (id, content) => { // ????
  const baseUrl = `/api/blogs/${id}/comments`
  const updatedContent = axios.post(baseUrl, content, { headers: headers() })
  return updatedContent
}

export default {  }