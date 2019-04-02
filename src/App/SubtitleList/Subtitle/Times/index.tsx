import React, { FC, memo, ChangeEventHandler, KeyboardEventHandler } from 'react'
import styled from 'styled-components'
import { Subtitle } from '../../../Context/SubtitleList/Subtitle'
import { Grid } from '../../../../Atomics/Grid'
import { useSubtitleList, TimeKind } from '../../../Context/SubtitleList'
import { Time as ITime } from '../../../Context/SubtitleList/Time'
import { Tilde } from '../../../../Components/Icons/Tilde'
import { Time } from './Time'

const Layout = styled(Grid.Horizontal)`
  grid-gap: 0.5rem;
  align-items: center;
  grid-template-columns: min-content 1.5rem min-content;

  color: hsl(0 0% 64%);
`

const emptyTime = ITime.createEmpty(false, false)

enum Arrows {
  ArrowUp = 100,
  ArrowDown = -100
}

interface Props {
  readonly index: number
  readonly subtitle: Subtitle
}

export const Times: FC<Props> = ({ index, subtitle }) => {
  const [subtitleList, dispatchSubtitleList] = useSubtitleList()

  const { timeRange, hash } = subtitle
  const { startsAt, endsAt } = timeRange

  const updateTime = (timeKind: TimeKind, time: ITime): ChangeEventHandler<HTMLInputElement> => event => {
    const value = Number.parseInt(event.currentTarget.value || '0')
    if (Number.isNaN(value) || value < 0) {
      return
    }

    const { hours, minutes, seconds, milliSeconds } = time.isStart ? startsAt : endsAt
    const timeInfo = { hours, minutes, seconds, milliSeconds }
    timeInfo[timeKind] = value
    const cachedTime = ITime.create(
      Math.abs(Math.min(timeInfo.hours, 23)),
      Math.abs(Math.min(timeInfo.minutes, 59)),
      Math.abs(Math.min(timeInfo.seconds, 59)),
      Math.abs(Math.min(timeInfo.milliSeconds, 999)),
      false,
      false
    )

    if (time.isStart) {
      const previousSubtitle = subtitleList[index - 1]
      const endsAtOfPreviousSubtitle = previousSubtitle ? previousSubtitle.timeRange.endsAt : emptyTime
      const currentEndsAt = endsAt.clone()
      currentEndsAt.addMilliSeconds(-1)
      const nextTime = currentEndsAt.min(endsAtOfPreviousSubtitle.max(cachedTime))
      nextTime.setStart(true)
      return dispatchSubtitleList({ type: 'edit::startsAt', hash, nextTime })
    }

    if (time.isEnd) {
      const startsAtOfNextSubtitle = subtitleList[index + 1]
      const currentStartsAt = startsAt.clone()
      currentStartsAt.addMilliSeconds(1)
      const nextTime = startsAtOfNextSubtitle
        ? startsAtOfNextSubtitle.timeRange.startsAt.min(currentStartsAt.max(cachedTime))
        : currentStartsAt.max(cachedTime)
      nextTime.setEnd(true)
      return dispatchSubtitleList({ type: 'edit::endsAt', hash, nextTime })
    }
  }

  const updateTimeByArrow = (timeKind: TimeKind, time: ITime): KeyboardEventHandler<HTMLInputElement> => event => {
    if (!Arrows.hasOwnProperty(event.key)) {
      return
    }

    event.preventDefault()

    const { hours, minutes, seconds, milliSeconds } = time
    const timeInfo = { hours, minutes, seconds, milliSeconds }
    timeInfo[timeKind] += 1 * Math.sign((Arrows[event.key as any] as any) as number)
    const cachedTime = ITime.create(
      timeInfo.hours,
      timeInfo.minutes,
      timeInfo.seconds,
      timeInfo.milliSeconds,
      time.isStart,
      time.isEnd
    )

    if (cachedTime.isStart) {
      const previousSubtitle = subtitleList[index - 1]
      const endsAtOfPreviousSubtitle = previousSubtitle ? previousSubtitle.timeRange.endsAt : emptyTime
      const currentEndsAt = endsAt.clone()
      currentEndsAt.addMilliSeconds(-1)
      const nextTime = currentEndsAt.min(endsAtOfPreviousSubtitle.max(cachedTime))
      nextTime.setStart(true)
      return dispatchSubtitleList({ type: 'edit::startsAt', hash, nextTime })
    }

    if (cachedTime.isEnd) {
      const startsAtOfNextSubtitle = subtitleList[index + 1]
      const currentStartsAt = startsAt.clone()
      currentStartsAt.addMilliSeconds(1)
      const nextTime = startsAtOfNextSubtitle
        ? startsAtOfNextSubtitle.timeRange.startsAt.min(currentStartsAt.max(cachedTime))
        : currentStartsAt.max(cachedTime)
      nextTime.setEnd(true)
      return dispatchSubtitleList({ type: 'edit::endsAt', hash, nextTime })
    }
  }

  return (
    <Layout>
      <Time subtitle={subtitle} time={startsAt} onKeyDown={updateTimeByArrow} onChange={updateTime} />
      <Tilde />
      <Time subtitle={subtitle} time={endsAt} onKeyDown={updateTimeByArrow} onChange={updateTime} />
    </Layout>
  )
}
