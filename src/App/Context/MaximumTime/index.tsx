import React, { FC, createContext, useContext, Dispatch, useReducer, Reducer } from 'react'
import { Time } from '../SubtitleList/Time'
import { TIME_SCALE_OFFSET_WIDTH, TIME_SCALE_RESOLUTION } from '../../../constants/TimeScale'

type Context = [State, Dispatch<Action>]

interface State {
  readonly time: Time
  readonly canvasWidth: number
  readonly totalMinutes: number
}

type Action =
  | {
      readonly type: 'reset'
    }
  | {
      readonly type: 'update'
      readonly time: Time
    }

const Context = createContext<Context>([{}, {}] as Context)

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'update': {
      const { time } = action
      const totalMinutes = (time.hours * 60 + time.minutes) * 60 + time.seconds
      const canvasWidth = totalMinutes * TIME_SCALE_OFFSET_WIDTH * TIME_SCALE_RESOLUTION

      return {
        time,
        totalMinutes,
        canvasWidth
      }
    }
  }
}

const createInitialState = (): State => {
  const time = Time.create(0, 1, 0, 0, false, false)
  const totalMinutes = (time.hours * 60 + time.minutes) * 60 + time.seconds
  const canvasWidth = totalMinutes * TIME_SCALE_OFFSET_WIDTH * TIME_SCALE_RESOLUTION

  return {
    time,
    totalMinutes,
    canvasWidth
  }
}

const initialState = createInitialState()

export const useMaximumTime = () => useContext(Context)

export const MaximumProvider: FC = ({ children }) => {
  const context = useReducer(reducer, initialState)
  return <Context.Provider value={context}>{children}</Context.Provider>
}
