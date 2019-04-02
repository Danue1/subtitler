import React, { FC, ChangeEventHandler, KeyboardEventHandler, memo, useState } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Colon } from '../../../../../Components/Icons/Colon'
import { Dot } from '../../../../../Components/Icons/Dot'
import { Grid } from '../../../../../Atomics/Grid'
import { Time as ITime } from '../../../../Context/SubtitleList/Time'
import { TimeKind } from '../../../../Context/SubtitleList'
import { useCurrentSubtitle } from '../../../../Context/CurrentSubtitle'
import { Subtitle } from '../../../../Context/SubtitleList/Subtitle'

const Layout = styled(Grid.Horizontal)`
  grid-gap: 0.25rem;
  align-items: center;
  grid-template-columns: repeat(3, min-content 0.5rem) min-content;

  &:hover,
  &.Focused {
    box-shadow: 0 0 0 1px hsl(0 0% 84%);
  }
`

const TimeValue = styled.input`
  padding: 0.25rem 0;

  text-align: center;

  &:hover,
  &:focus {
    background-color: white;
    box-shadow: 0 0 0 1px hsl(210 100% 84%);
  }
`

const Hour = styled(TimeValue)`
  width: 2ch;
`

const Minute = styled(TimeValue)`
  width: 2ch;
`

const Second = styled(TimeValue)`
  width: 2ch;
`

const MilliSecond = styled(TimeValue)`
  width: 3ch;
`

enum Focus {
  None,
  Hours,
  Minutes,
  Seconds,
  MilliSeconds
}

interface Props {
  readonly subtitle: Subtitle
  readonly time: ITime
  readonly onKeyDown: (timeKind: TimeKind, time: ITime) => KeyboardEventHandler<HTMLInputElement>
  readonly onChange: (timeKind: TimeKind, time: ITime) => ChangeEventHandler<HTMLInputElement>
}

export const Time: FC<Props> = ({ subtitle, time, onKeyDown, onChange }) => {
  const [focus, setFocus] = useState<Focus>(Focus.None)
  const [, dispatchCurrentSubtitle] = useCurrentSubtitle()

  const updateFocus = (focus: Focus) => {
    setFocus(focus)
    dispatchCurrentSubtitle({ type: 'select', subtitle })
  }

  const setFocusOut = () => {
    setFocus(Focus.None)
  }

  const layoutClassName = classNames({
    Focused: focus !== Focus.None
  })

  return (
    <Layout className={layoutClassName}>
      <Hour
        value={time.hours}
        onChange={onChange('hours', time)}
        onKeyDown={onKeyDown('hours', time)}
        onFocus={() => updateFocus(Focus.Hours)}
        onBlur={setFocusOut}
        min={0}
        max={23}
      />

      <Colon />

      <Minute
        value={time.minutes}
        onChange={onChange('minutes', time)}
        onKeyDown={onKeyDown('minutes', time)}
        onFocus={() => updateFocus(Focus.Minutes)}
        onBlur={setFocusOut}
        min={0}
        max={59}
      />

      <Colon />

      <Second
        value={time.seconds}
        onChange={onChange('seconds', time)}
        onKeyDown={onKeyDown('seconds', time)}
        onFocus={() => updateFocus(Focus.Seconds)}
        onBlur={setFocusOut}
        min={0}
        max={59}
      />

      <Dot />

      <MilliSecond
        value={time.milliSeconds}
        onChange={onChange('milliSeconds', time)}
        onKeyDown={onKeyDown('milliSeconds', time)}
        onFocus={() => updateFocus(Focus.MilliSeconds)}
        onBlur={setFocusOut}
        min={0}
        max={999}
      />
    </Layout>
  )
}
