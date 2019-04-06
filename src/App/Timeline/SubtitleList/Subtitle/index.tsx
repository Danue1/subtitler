import React, { FC, memo, MouseEventHandler } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Subtitle as ISubtitle } from '../../../Context/SubtitleList/Subtitle'
import { Div } from '../../../../Atomics/Div'
import { TIME_SCALE_OFFSET_WIDTH } from '../../../../constants/TimeScale'
import { HashTag } from '../../../../Components/Icons/HashTag'
import { Grid } from '../../../../Atomics/Grid'

const Layout = styled(Grid.Horizontal)`
  overflow: hidden;
  position: absolute;
  top: 0;

  grid-template-columns: 1.5rem min-content min-content;
  align-items: center;

  color: hsl(0 0% 64%);
  box-shadow: inset 0 0 0 1px hsl(0 0% 84%);

  transition-property: left, width;

  &:hover,
  &.Selected {
    background-color: hsl(0 0% 96%);
  }
`

const Index = styled(Div)`
  transform: rotate(8deg);
`

const Text = styled.span`
  margin-left: 0.5rem;
`

interface Props {
  readonly index: number
  readonly subtitle: ISubtitle
  readonly isSelected: boolean
  readonly onSelect: MouseEventHandler<HTMLDivElement>
}

const SubtitleComponent: FC<Props> = ({ index, subtitle, isSelected, onSelect }) => {
  const layoutClassName = classNames({
    Selected: isSelected
  })

  const style = {
    left: (subtitle.timeRange.startsAt.timestamp / 1000) * TIME_SCALE_OFFSET_WIDTH,
    width:
      ((subtitle.timeRange.endsAt.timestamp - subtitle.timeRange.startsAt.timestamp) / 1000) * TIME_SCALE_OFFSET_WIDTH
  }

  return (
    <Layout className={layoutClassName} onClick={onSelect} style={style}>
      <HashTag />
      <Index>{index}</Index>
      <Text>{subtitle.text}</Text>
    </Layout>
  )
}

export const Subtitle = memo(
  SubtitleComponent,
  (previous, next) =>
    previous.index === next.index &&
    previous.isSelected === next.isSelected &&
    previous.subtitle.text === next.subtitle.text &&
    previous.subtitle.timeRange === next.subtitle.timeRange
)
