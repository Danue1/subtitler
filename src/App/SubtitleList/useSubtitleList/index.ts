import { useReducer, Reducer, Dispatch } from 'react'
import { Subtitle, createSubtitle, createEmptySubtitle } from './Subtitle'
import { Time } from './Time'
import { createTimeRange } from './TimeRange'

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
      const previousSubtitle = state[index]
      const nextSubtitle = state[index + 1]
      const nextStartsAt = previousSubtitle.timeRange.endsAt.clone()
      const endsAt = nextStartsAt.clone()
      endsAt.addSeconds(10)
      // 자막 리스트 끝에 자막 추가
      if (!nextSubtitle) {
        const subtitle = createSubtitle(createTimeRange(nextStartsAt, endsAt))
        return state.concat(subtitle)
      }

      // 다음 자막의 시작시각이 현재 자막의 종료시각과 같으면 변화 없음
      if (nextSubtitle.timeRange.startsAt.isEqual(previousSubtitle.timeRange.endsAt)) {
        return state
      }

      const nextEndsAt = nextSubtitle.timeRange.startsAt.max(endsAt)
      const subtitle = createSubtitle(createTimeRange(nextStartsAt, nextEndsAt))
      state.splice(index + 1, 0, subtitle)
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

const initialState: State = [createEmptySubtitle()]

export const useSubtitleList = () => useReducer(reducer, initialState)
