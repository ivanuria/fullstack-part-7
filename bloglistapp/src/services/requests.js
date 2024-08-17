import axios from 'axios'
import { useLoginValue } from '../contexts/LoginContext'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

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
  errorHandlers={
    on4xx: (error) => {
      console.log('unauthorized')
      throw error
    },
    on5xx: (error) => {
      console.log('server error')
      throw error
    }
  }) => {

  const user = useLoginValue()

  const headers = {}

  if (user && user.token) {
    headers.authorization = `Bearer ${user.token}`
  }

  const Create = async newObject => {
    let response
    try {
      response = await axios.post(baseUrl, newObject, { headers })
    } catch (error) {
      return handleError(error, errorHandlers.on4xx, errorHandlers.on5xx)
    }
    return await response.data
  }

  const Read = async id => {
    let url = baseUrl
    if (id) url = `${baseUrl}/${id}`
    let response
    try {
      response = await axios.get(url, { headers })
    } catch (error) {
      return handleError(error, errorHandlers.on4xx, errorHandlers.on5xx)
    }
    const data = await response.data
    console.log('READ', data)
    return data
  }

  const Update = async (newObject) => {
    const id = newObject.id
    const url = `${baseUrl}/${id}`
    console.log('UPDATE', url)
    let response
    try {
      response = await axios.put(url, newObject, { headers })
    } catch (error) {
      return handleError(error, errorHandlers.on4xx, errorHandlers.on5xx)
    }
    return await response.data
  }

  const Delete = async id => {
    let url = `${baseUrl}/${id}`
    let response
    try {
      response = await axios.delete(url, { headers })
    } catch (error) {
      return handleError(error, errorHandlers.on4xx, errorHandlers.on5xx)
    }
    return await response.data
  }

  return [Create, Read, Update, Delete]
}

const useRequests = (baseUrl, queryKey, errorHandlers={
    on4xx: (error) => {
      console.log('unauthorized')
      throw error
    },
    on5xx: (error) => {
      console.log('server error')
      throw error
    }
  }) => {

  const queryClient = useQueryClient()
  const [c, r, u, d] = useCRUD(baseUrl, errorHandlers)

  const createMutation = useMutation({
    mutationFn: c,
    onSuccess: (savedObject) => {
      const objs = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, objs.concat(savedObject))
    }
  })

  const updateMutation = useMutation({
    mutationFn: u,
    onSuccess: (savedObject) => {
      const objs = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, objs.map(o => o.id.toString() !== savedObject.id.toString() ? o : savedObject))
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: d,
    onSuccess: (data, variables) => {
      console.log('variables', variables)
      const objs = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, objs.filter(o => o.id.toString() !== variables.toString()))
    }
  })

  const Create = async (newObject) => {
    createMutation.mutate(newObject)
    return createMutation
  }

  const Read = (id) => {
    const result = useQuery({
      queryKey,
      queryFn: () => r(id).then(res => res),
      refetchOnWindowFocus: false
    })
    return result
  }

  const Update = (newObject) => {
    console.log('UPDATEMutation')
    updateMutation.mutate(newObject)
    return updateMutation
  }

  const Delete = (id) => {
    deleteMutation.mutate(id)
    return deleteMutation
  }

  return [Create, Read, Update, Delete]
}

export default useRequests