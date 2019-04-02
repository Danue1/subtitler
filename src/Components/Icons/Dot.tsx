import React, { FC } from 'react'
import { SVG } from '../../Atomics/SVG'

export const Dot: FC = () => (
  <SVG viewBox="0 0 16 64">
    <line x1="6" y1="42" x2="10" y2="38" />
    <line x1="6" y1="38" x2="10" y2="42" />
  </SVG>
)
