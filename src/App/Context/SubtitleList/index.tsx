import React, { useReducer, Reducer, Dispatch, FC, createContext, useContext } from 'react'
import { Subtitle } from './Subtitle'
import { Time } from './Time'
import { TimeAdder } from './TimeAdder'
import { TimeRange } from './TimeRange'

type Context = [State, Dispatch<Action>]

type State = Subtitle[]

type Action =
  | {
      readonly type: 'reset'
    }
  | {
      readonly type: 'add' | 'remove'
      readonly hash: number
    }
  | {
      readonly type: EditingKind
      readonly hash: number
      readonly nextTime: Time
    }
  | {
      readonly type: 'edit::text'
      readonly hash: number
      readonly text: string
    }

export type TimeKind = keyof Pick<TimeAdder, 'hours' | 'minutes' | 'seconds' | 'milliSeconds'>

export type EditingKind = 'edit::startsAt' | 'edit::endsAt'

const Context = createContext<Context>([{}, {}] as Context)

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'add': {
      const index = state.findIndex(({ hash }) => hash === action.hash)
      const previousSubtitle = state[index]
      const nextSubtitle = state[index + 1]
      const nextStartsAt = previousSubtitle.timeRange.endsAt.clone()
      const endsAt = nextStartsAt.clone()
      nextStartsAt.setStart(true)
      endsAt.setEnd(true)
      endsAt.addSeconds(10)
      // 자막 리스트 끝에 자막 추가
      if (!nextSubtitle) {
        const subtitle = Subtitle.create(TimeRange.create(nextStartsAt, endsAt))
        return state.concat(subtitle)
      }

      // 다음 자막의 시작시각이 현재 자막의 종료시각과 같으면 변화 없음
      if (nextSubtitle.timeRange.startsAt.isEqual(previousSubtitle.timeRange.endsAt)) {
        return state
      }

      const nextEndsAt = nextSubtitle.timeRange.startsAt.min(endsAt)
      const subtitle = Subtitle.create(TimeRange.create(nextStartsAt, nextEndsAt))
      state.splice(index + 1, 0, subtitle)
      return [...state]
    }
    case 'remove': {
      return state.length === 1 ? createInitialState() : state.filter(({ hash }) => hash !== action.hash)
    }
    case 'edit::startsAt': {
      state.find(({ hash }) => hash === action.hash)!.timeRange.startsAt = action.nextTime
      return [...state]
    }
    case 'edit::endsAt': {
      state.find(({ hash }) => hash === action.hash)!.timeRange.endsAt = action.nextTime
      return [...state]
    }
    case 'edit::text': {
      state.find(({ hash }) => hash === action.hash)!.text = action.text
      return [...state]
    }
  }
}

const createInitialState = (): State => {
  const subtitle = Subtitle.createEmpty()
  subtitle.timeRange.endsAt.addSeconds(10)
  return [subtitle]
}

const initialState: State = createInitialState()

export const useSubtitleList = () => useContext(Context)

export const SubtitleListProvider: FC = ({ children }) => {
  const context: Context = useReducer(reducer, initialState)
  return <Context.Provider value={context}> {children}</Context.Provider>
}
