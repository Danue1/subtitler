import React, { FC, createContext, useContext, useMemo } from 'react'
import { useSubtitleList } from '../SubtitleList'
import { Time } from '../SubtitleList/Time'

type Context = State

interface State {
  readonly time: Time
  readonly totalMinutes: number
}

const Context = createContext<Context>({} as Context)

export const useMaximumTime = () => useContext(Context)

export const MaximumProvider: FC = ({ children }) => {
  const [subtitleList] = useSubtitleList()
  const totalMinutes = useMemo(() => {
    const lastSubtitle = subtitleList[subtitleList.length - 1]
    return {
      time: lastSubtitle.timeRange.endsAt,
      totalMinutes: lastSubtitle.timeRange.endsAt.timestamp / 1000
    }
  }, [subtitleList])

  return <Context.Provider value={totalMinutes}>{children}</Context.Provider>
}
