import React, { FC } from 'react'
import { SVG } from '../../Atomics/SVG'

export const Cross: FC = () => (
  <SVG viewBox="0 0 64 64">
    <line x1="48.97" y1="15.03" x2="15.03" y2="48.97" />
    <line x1="15.03" y1="15.03" x2="48.97" y2="48.97" />
  </SVG>
)
