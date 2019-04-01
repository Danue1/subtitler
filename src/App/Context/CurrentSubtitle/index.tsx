import React, { FC, Dispatch, useReducer, Reducer, createContext, useContext } from 'react'
import { Subtitle, createEmptySubtitle } from '../SubtitleList/Subtitle'
import { Time } from '../SubtitleList/Time'

type Context = [State, CurrentSubtitleDispatch]

interface State {
  readonly subtitle: Subtitle
  readonly kind: Kind
}

type Kind = 'none' | SettingKind | EditingKind

export type SettingKind = 'set::startsAt' | 'set::endsAt'

export type EditingKind = 'editing::startsAt' | 'editing::endsAt'

type Action =
  | {
      readonly type: 'reset'
    }
  | {
      readonly type: SettingKind
      readonly time: Time
    }
  | {
      readonly type: EditingKind
      readonly subtitle: Subtitle
    }

export type CurrentSubtitleDispatch = Dispatch<Action>

const Context = createContext<Context>([{}, {}] as Context)

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'editing::startsAt': {
      return {
        subtitle: action.subtitle,
        kind: 'editing::startsAt'
      }
    }
    case 'editing::endsAt': {
      return {
        subtitle: action.subtitle,
        kind: 'editing::endsAt'
      }
    }
    case 'set::startsAt': {
      // TODO(Danuel)
      return createInitialState()
    }
    case 'set::endsAt': {
      // TODO(Danuel)
      return createInitialState()
    }
  }
}

const createInitialState = (): State => ({
  subtitle: createEmptySubtitle(),
  kind: 'none'
})

const initialState: State = createInitialState()

export const useCurrentSubtitle = () => useContext(Context)

export const CurrentSubtitleProvider: FC = ({ children }) => {
  const context: Context = useReducer(reducer, initialState)
  return <Context.Provider value={context}>{children}</Context.Provider>
}
