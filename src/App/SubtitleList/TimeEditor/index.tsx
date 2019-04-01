import React, { FC, useState, useEffect } from 'react'
import { Div } from '../../../Atomics/Div'
import { Header } from '../../../Components/Modal/Header'
import { Time, createEmptyTime } from '../../Context/SubtitleList/Time'
import { useCurrentSubtitle } from '../../Context/CurrentSubtitle'

const Layout = Div

export const TimeEditor: FC = () => {
  const [{ subtitle, kind }, dispatchCurrentSubtitle] = useCurrentSubtitle()
  const [time, setTime] = useState<Time>(createEmptyTime)

  const updateTime = () => {
    const { timeRange } = subtitle
    const time = kind === 'editing::startsAt' ? timeRange.startsAt : timeRange.endsAt
    setTime(time.clone())
  }
  useEffect(updateTime, [kind])

  const closeModal = () => {
    dispatchCurrentSubtitle({ type: 'reset' })
  }

  return (
    <Layout onClick={closeModal}>
      <Header name="시각 수정" />
      <div>현재 시각</div>
      <div>{time.toString()}</div>
    </Layout>
  )
}
