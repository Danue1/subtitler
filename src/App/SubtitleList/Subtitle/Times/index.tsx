import React, { FC, memo, ChangeEventHandler, KeyboardEventHandler } from 'react'
import styled from 'styled-components'
import { Subtitle } from '../../../Context/SubtitleList/Subtitle'
import { Grid } from '../../../../Atomics/Grid'
import { useSubtitleList, TimeKind } from '../../../Context/SubtitleList'
import { Time as ITime } from '../../../Context/SubtitleList/Time'
import { Div } from '../../../../Atomics/Div'
import { Tilde } from '../../../../Components/Icons/Tilde'
import { Time } from './Time'

const Layout = styled(Grid.Horizontal)`
  grid-gap: 0.5rem;
  align-items: center;

  color: hsl(0 0% 64%);
`

const Spacer = styled(Div)`
  width: 1.5rem;
`

const emptyTime = ITime.createEmpty(false, false)

enum Arrows {
  ArrowUp = 100,
  ArrowRight = 100,
  ArrowDown = -100,
  ArrowLeft = -100
}

interface Props {
  readonly index: number
  readonly subtitle: Subtitle
}

const TimesComponent: FC<Props> = ({ subtitle }) => {
  const [subtitleList, dispatchSubtitleList] = useSubtitleList()

  const { timeRange, hash } = subtitle
  const { startsAt, endsAt } = timeRange

  const updateTime = (timeKind: TimeKind, time: ITime): ChangeEventHandler<HTMLInputElement> => event => {
    const value = Number.parseInt(event.currentTarget.value || '0')
    if (Number.isNaN(value)) {
      return
    }

    const { hours, minutes, seconds, milliSeconds } = time.isStart ? startsAt : endsAt
    const timeInfo = { hours, minutes, seconds, milliSeconds }
    timeInfo[timeKind] = value
    const cachedTime = ITime.create(
      timeInfo.hours,
      timeInfo.minutes,
      timeInfo.seconds,
      timeInfo.milliSeconds,
      false,
      false
    )

    const currentSubtitleIndex = subtitleList.findIndex(subtitle => subtitle.hash === hash)

    if (time.isStart) {
      const previousSubtitle = subtitleList[currentSubtitleIndex - 1]
      const endsAtOfPreviousTime = previousSubtitle ? previousSubtitle.timeRange.endsAt : emptyTime
      const nextTime = endsAt.min(endsAtOfPreviousTime.max(cachedTime))
      nextTime.setStart(true)
      return dispatchSubtitleList({ type: 'edit::startsAt', hash, nextTime })
    }

    if (time.isEnd) {
      const startsAtOfNextSubtitle = subtitleList[currentSubtitleIndex + 1]
      const nextTime = startsAtOfNextSubtitle
        ? startsAtOfNextSubtitle.timeRange.startsAt.min(startsAt.max(cachedTime))
        : startsAt.max(cachedTime)
      nextTime.setEnd(true)
      return dispatchSubtitleList({ type: 'edit::endsAt', hash, nextTime })
    }
  }

  const updateTimeByArrow = (kind: TimeKind, time: ITime): KeyboardEventHandler<HTMLInputElement> => event => {
    if (!Arrows.hasOwnProperty(event.key)) {
      return
    }

    event.preventDefault()
    const { hours, minutes, seconds, milliSeconds } = time
    const timeInfo = { hours, minutes, seconds, milliSeconds }
    timeInfo[kind] += 1 * Math.sign((Arrows[event.key as any] as any) as number)
    const nextTime = ITime.create(
      timeInfo.hours,
      timeInfo.minutes,
      timeInfo.seconds,
      timeInfo.milliSeconds,
      time.isStart,
      time.isEnd
    )
    dispatchSubtitleList({ type: nextTime.isStart ? 'edit::startsAt' : 'edit::endsAt', nextTime, hash })
  }

  return (
    <Layout>
      <Time time={startsAt} onKeyDown={updateTimeByArrow} onChange={updateTime} />

      <Spacer>
        <Tilde />
      </Spacer>

      <Time time={endsAt} onKeyDown={updateTimeByArrow} onChange={updateTime} />
    </Layout>
  )
}

export const Times = memo(TimesComponent, (previous, next) => previous.subtitle.timeRange === next.subtitle.timeRange)
