import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { StateAction } from './action'
import initialState, { State } from './initialState'
import reducer from './reducer'

export const StateContext = createContext<[State, Dispatch<StateAction>]>(null)

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateValue = () => useContext(StateContext)
