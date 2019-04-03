import React, { FC } from 'react'
import styled from 'styled-components'
import { useTimeScale } from './useTimeScale'
import { TIME_SCALE_HEIGHT, TIME_SCALE_RESOLUTION } from '../../../constants/TimeScale'
import { useMaximumTime } from '../../Context/MaximumTime'

const Canvas = styled.canvas`
  height: 1.5rem;
`

export const TimeScale: FC = () => {
  const [{ canvasWidth }] = useMaximumTime()
  const canvasRef = useTimeScale()
  return <Canvas ref={canvasRef} width={canvasWidth} height={TIME_SCALE_HEIGHT * TIME_SCALE_RESOLUTION} />
}
