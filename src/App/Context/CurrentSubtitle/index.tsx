import React, { FC, Dispatch, useReducer, Reducer, createContext, useContext } from 'react'
import { Subtitle } from '../SubtitleList/Subtitle'

type Context = [State, CurrentSubtitleDispatch]

type State = Subtitle

type Action =
  | {
      readonly type: 'reset'
    }
  | {
      readonly type: 'select'
      readonly subtitle: Subtitle
    }

export type CurrentSubtitleDispatch = Dispatch<Action>

const Context = createContext<Context>([{}, {}] as Context)

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'select': {
      return action.subtitle
    }
  }
}

const createInitialState = (): State => Subtitle.createEmpty()

const initialState: State = createInitialState()

export const useCurrentSubtitle = () => useContext(Context)

export const CurrentSubtitleProvider: FC = ({ children }) => {
  const context: Context = useReducer(reducer, initialState)
  return <Context.Provider value={context}>{children}</Context.Provider>
}
