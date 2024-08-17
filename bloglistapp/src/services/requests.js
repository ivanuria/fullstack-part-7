import axios from 'axios'
import { useLoginValue } from '../contexts/LoginContext'

const handleError = (error, on4xx, on5xx) => {
  if (error.response && error.response.status) {
    if (Number(error.response.status) >= 400 && Number(error.response.status) < 500)
      return on4xx(error)
    if (Number(error.response.status) >= 500 && Number(error.response.status) < 600)
      return on5xx(error)
  }
  throw error
}

const useCRUD = (
  baseUrl,
  {
    on4xx = () => console.log('unauthorized'),
    on5xx = () => console.log('server error')
  }) => {

  const user = useLoginValue()

  const headers = {}

  if (user && user.token) {
    headers.authorization = `Bearer ${user.token}`
  }

  const Create = async newObject => {
    let response
    try {
      response = await axios.post(baseUrl, newObject, headers)
    } catch (error) {
      return handleError(error, on4xx, on5xx)
    }
    return await response.data
  }

  const Read = async id => {
    let url = baseUrl
    if (id) url = `${baseUrl}/${id}`
    try {
      response = await axios.get(url)
    } catch (error) {
      return handleError(error, on4xx, on5xx)
    }
    return await response.data
  }

  const Update = async (id, newObject) => {
    let url = `${baseUrl}/${id}`
    try {
      response = await axios.put(url, newObject)
    } catch (error) {
      return handleError(error, on4xx, on5xx)
    }
    return await response.data
  }

  const Delete = async id => {
    let url = `${baseUrl}/${id}`
    try {
      response = await axios.delete(url)
    } catch (error) {
      return handleError(error, on4xx, on5xx)
    }
    return await response.data
  }

  return [Create, Read, Update, Delete]
}

export default useCRUD