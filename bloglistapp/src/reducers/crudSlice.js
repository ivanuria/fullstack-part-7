import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const crudSlice = (name, initialState) =>
  createSlice({
    name,
    initialState,
    reducers: {
      [`set${_.capitalize(name)}`]: (state, action) => {
        return action.payload
      },
      [`create${_.capitalize(name)}`]: (state, action) => {
        state.push(action.payload)
      },
      [`delete${_.capitalize(name)}`]: (state, action) => {
        return state.filter(s => s.id.toString() !== action.payload.toString())
      },
      [`update${_.capitalize(name)}`]: (state, action) => {
        return state.map(s =>
          s.id.toString() !== action.payload.id.toString() ? s : action.payload,
        )
      },
    },
  })

export default crudSlice
