import React, { FC } from 'react'
import styled from 'styled-components'
import { useTimeScale } from './useTimeScale'
import { TIME_SCALE_HEIGHT, TIME_SCALE_RESOLUTION, TIME_SCALE_OFFSET_WIDTH } from '../../../constants/TimeScale'
import { useMaximumTime } from '../../Context/MaximumTime'

const Canvas = styled.canvas`
  height: 1.5rem;
`

export const TimeScale: FC = () => {
  const { totalMinutes } = useMaximumTime()
  const canvasRef = useTimeScale()

  const width = totalMinutes * TIME_SCALE_OFFSET_WIDTH * TIME_SCALE_RESOLUTION
  const HEIGHT = TIME_SCALE_HEIGHT * TIME_SCALE_RESOLUTION

  return <Canvas ref={canvasRef} width={width} height={HEIGHT} />
}
