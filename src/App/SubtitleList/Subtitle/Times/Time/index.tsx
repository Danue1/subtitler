import React, { FC, ChangeEventHandler, KeyboardEventHandler, memo, useState } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Grid } from '../../../../../Atomics/Grid'
import { Time as ITime } from '../../../../Context/SubtitleList/Time'
import { TimeKind } from '../../../../Context/SubtitleList'

const Layout = styled(Grid.Horizontal)`
  grid-gap: 0.25rem;
  align-items: center;

  &:hover,
  &.Focused {
    box-shadow: 0 0 0 1px hsl(0 0% 84%);
  }
`

const TimeValue = styled.input`
  padding: 0.25rem 0;

  text-align: end;

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
  readonly time: ITime
  readonly onKeyDown: (timeKind: TimeKind, time: ITime) => KeyboardEventHandler<HTMLInputElement>
  readonly onChange: (timeKind: TimeKind, time: ITime) => ChangeEventHandler<HTMLInputElement>
}

const TimeComponent: FC<Props> = ({ time, onKeyDown, onChange }) => {
  const [focus, setFocus] = useState<Focus>(Focus.None)

  const setFocusOut = () => setFocus(Focus.None)

  const layoutClassName = classNames({
    Focused: focus !== Focus.None
  })

  return (
    <Layout className={layoutClassName}>
      <Hour
        value={time.hours}
        onChange={onChange('hours', time)}
        onKeyDown={onKeyDown('hours', time)}
        onFocus={() => setFocus(Focus.Hours)}
        onBlur={setFocusOut}
        min={0}
        max={23}
      />
      <span>:</span>
      <Minute
        value={time.minutes}
        onChange={onChange('minutes', time)}
        onKeyDown={onKeyDown('minutes', time)}
        onFocus={() => setFocus(Focus.Minutes)}
        onBlur={setFocusOut}
        min={0}
        max={59}
      />
      <span>:</span>
      <Second
        value={time.seconds}
        onChange={onChange('seconds', time)}
        onKeyDown={onKeyDown('seconds', time)}
        onFocus={() => setFocus(Focus.Seconds)}
        onBlur={setFocusOut}
        min={0}
        max={59}
      />
      <span>.</span>
      <MilliSecond
        value={time.milliSeconds}
        onChange={onChange('milliSeconds', time)}
        onKeyDown={onKeyDown('milliSeconds', time)}
        onFocus={() => setFocus(Focus.MilliSeconds)}
        onBlur={setFocusOut}
        min={0}
        max={999}
      />
    </Layout>
  )
}

export const Time = memo(TimeComponent, (previous, next) => previous.time === next.time)
