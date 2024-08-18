import axios from 'axios'
import _ from 'lodash'
import { loggedInUser } from '../reducers/user'

export const headers = () => {
  const user = loggedInUser()
  if (!user) return null
  return {
    Authorization: `Bearer ${user.token}`,
  }
}

const crud = (name, baseUrl) => {
  return {
    [`create${_.capitalize(name)}`]: async newObject => {
      const request = await axios.post(baseUrl, newObject, {
        headers: headers(),
      })
      return await request.data
    },
    [`read${_.capitalize(name)}`]: async id => {
      let url = baseUrl
      if (id) url = `${baseUrl}/${id}`
      const request = await axios.get(url, { headers: headers() })
      return await request.data
    },
    [`update${_.capitalize(name)}`]: async (id, newObject) => {
      const request = await axios.put(`${baseUrl}/${id}`, newObject, {
        headers: headers(),
      })
      return await request.data
    },
    [`delete${_.capitalize(name)}`]: async id => {
      await axios.delete(`${baseUrl}/${id}`, { headers: headers() })
    },
  }
}

export default crud
