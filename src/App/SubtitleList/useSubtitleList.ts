import { useReducer, Reducer, Dispatch } from 'react'
import { Subtitle, createSubtitle, createEmptySubtitle } from './Subtitle'
import { Time } from './Time'

type State = Subtitle[]

type Action =
  | {
      readonly type: 'reset'
    }
  | {
      readonly type: 'add'
      readonly hash: number
    }
  | {
      readonly type: 'remove'
      readonly hash: number
    }
  | {
      readonly type: 'edit::startsAt'
      readonly hash: number
      readonly startsAt: Time
    }
  | {
      readonly type: 'edit::endsAt'
      readonly hash: number
      readonly endsAt: Time
    }
  | {
      readonly type: 'edit::text'
      readonly hash: number
      readonly text: string
    }

export type SubtitleListDispatch = Dispatch<Action>

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return [createEmptySubtitle()]
    }
    case 'add': {
      const index = state.findIndex(({ hash }) => hash === action.hash)
      const currentSubtitle = state[index]
      const nextSubtitle = createSubtitle(currentSubtitle.timeRange.clone())
      state.splice(index + 1, 0, nextSubtitle)
      return [...state]
    }
    case 'remove': {
      return state.length === 1 ? [createEmptySubtitle()] : state.filter(({ hash }) => hash !== action.hash)
    }
    case 'edit::startsAt': {
      state.find(({ hash }) => hash === action.hash)!.setStartsAt(action.startsAt)
      return [...state]
    }
    case 'edit::endsAt': {
      state.find(({ hash }) => hash === action.hash)!.setEndsAt(action.endsAt)
      return [...state]
    }
    case 'edit::text': {
      state.find(({ hash }) => hash === action.hash)!.setText(action.text)
      return [...state]
    }
  }
}

export const useSubtitleList = () => useReducer(reducer, initialState)

const initialState: State = Array.from({ length: 16 }, createEmptySubtitle)
