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

const maximumTime = Time.create(23, 59, 59, 999, false, false)

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'add': {
      const index = state.findIndex(({ hash }) => hash === action.hash)
      const currentSubtitle = state[index]
      const nextSubtitle = state[index + 1]
      const nextStartsAt = currentSubtitle.timeRange.endsAt.clone()
      const endsAt = nextStartsAt.clone()
      nextStartsAt.setStart(true)
      endsAt.setEnd(true)
      endsAt.addSeconds(10)

      // 현재 자막의 종료시각이 '24시간 - 1'이면 변화 없음
      if (maximumTime.isEquals(nextStartsAt)) {
        return state
      }

      // 자막 리스트 끝에 자막 추가
      if (!nextSubtitle) {
        const subtitle = Subtitle.create(TimeRange.create(nextStartsAt, endsAt))
        return state.concat(subtitle)
      }

      // 다음 자막의 시작시각이 현재 자막의 종료시각과 같으면 변화 없음
      if (nextSubtitle.timeRange.startsAt.isEquals(currentSubtitle.timeRange.endsAt)) {
        return state
      }

      const nextEndsAt = nextSubtitle.timeRange.startsAt.min(endsAt)
      nextEndsAt.setEnd(true)
      const subtitle = Subtitle.create(TimeRange.create(nextStartsAt, nextEndsAt))
      state.splice(index + 1, 0, subtitle)
      return [...state]
    }
    case 'remove': {
      return state.length === 1 ? createInitialState() : state.filter(({ hash }) => hash !== action.hash)
    }
    case 'edit::startsAt': {
      // state.find(({ hash }) => hash === action.hash)!.timeRange.startsAt = action.nextTime
      // return [...state]
      return state.map(subtitle => {
        if (subtitle.hash !== action.hash) {
          return subtitle
        }
        const nextSubtitle = subtitle.clone()
        nextSubtitle.text = subtitle.text
        nextSubtitle.timeRange.startsAt = action.nextTime
        nextSubtitle.timeRange.endsAt.setEnd(true)
        return nextSubtitle
      })
    }
    case 'edit::endsAt': {
      return state.map(subtitle => {
        if (subtitle.hash !== action.hash) {
          return subtitle
        }
        const nextSubtitle = subtitle.clone()
        nextSubtitle.text = subtitle.text
        nextSubtitle.timeRange.endsAt = action.nextTime
        nextSubtitle.timeRange.startsAt.setStart(true)
        return nextSubtitle
      })
    }
    case 'edit::text': {
      return state.map(subtitle => {
        if (subtitle.hash !== action.hash) {
          return subtitle
        }
        const nextSubtitle = subtitle.clone()
        nextSubtitle.text = action.text
        nextSubtitle.timeRange.startsAt.setStart(true)
        nextSubtitle.timeRange.endsAt.setEnd(true)
        return nextSubtitle
      })
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
