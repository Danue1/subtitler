import { Reducer } from 'react'
import { Subtitle } from './useSubtitleList/Subtitle'

type State = Subtitle

type Action = {
  readonly type: ''
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case '': {
      return state
    }
  }
}

export const useSub
