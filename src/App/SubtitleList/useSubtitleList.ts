import { useReducer, Reducer, Dispatch } from 'react'

class Subtitle {
  public constructor(private _startsAt: Time, private _endsAt: Time, private _text: string) {}

  public get text() {
    return this._text
  }

  public setText(text: string) {
    this._text = text
  }

  public get startsAt() {
    return this.format(this._startsAt)
  }

  public setStartsAt(time: string) {
    // TODO
  }

  public get endsAt() {
    return this.format(this._endsAt)
  }

  public setEndsAt(time: string) {
    // TODO
  }

  private format(time: Time) {
    const minutes = time.minutes.toString().padStart(2, '0')
    const seconds = time.seconds.toString().padStart(2, '0')
    const microSeconds = time.microSeconds.toString().padStart(3, '0')
    return `${time.hours}:${minutes}:${seconds}.${microSeconds}`
  }
}

type State = Subtitle[]

interface Time {
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly microSeconds: number
}

type Action =
  | {
      readonly type: 'reset'
    }
  | {
      readonly type: 'add'
      readonly index: number
      readonly startsAt: Time
      readonly endsAt: Time
      readonly text: string
    }
  | {
      readonly type: 'remove'
      readonly index: number
    }
  | {
      readonly type: 'edit::startsAt'
      readonly index: number
      readonly startsAt: string
    }
  | {
      readonly type: 'edit::endsAt'
      readonly index: number
      readonly endsAt: string
    }
  | {
      readonly type: 'edit::text'
      readonly index: number
      readonly text: string
    }

export type SubtitleListDispatch = Dispatch<Action>

const reducer: Reducer<State, Action> = (state, action) => {
  const updateSubtitle = (currentIndex: number, dispatch: (subtitle: Subtitle) => void) =>
    state.map((subtitle, index) => (index === currentIndex && dispatch(subtitle), subtitle))

  switch (action.type) {
    case 'reset': {
      return []
    }
    case 'add': {
      return state
        .map((subtitle, index) =>
          index !== action.index ? [subtitle] : [subtitle, new Subtitle(action.startsAt, action.endsAt, action.text)]
        )
        .flat()
    }
    case 'remove': {
      return state.filter((_, index) => index !== action.index)
    }
    case 'edit::startsAt': {
      return updateSubtitle(action.index, subtitle => subtitle.setStartsAt(action.startsAt))
    }
    case 'edit::endsAt': {
      return updateSubtitle(action.index, subtitle => subtitle.setEndsAt(action.endsAt))
    }
    case 'edit::text': {
      return updateSubtitle(action.index, subtitle => subtitle.setText(action.text))
    }
  }
}

export const useSubtitleList = () => useReducer(reducer, initialState)

const createSubtitle = () =>
  new Subtitle(
    {
      hours: 0,
      minutes: 0,
      seconds: 0,
      microSeconds: 0
    },
    {
      hours: 0,
      minutes: 0,
      seconds: 0,
      microSeconds: 0
    },
    ''
  )

const initialState: State = Array.from({ length: 32 }, createSubtitle)
