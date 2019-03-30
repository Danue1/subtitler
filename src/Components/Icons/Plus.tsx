import React, { FC } from 'react'
import { SVG } from '../../Atomics/SVG'

export const Plus: FC = () => (
  <SVG viewBox="0 0 64 64">
    <line x1="32" y1="8" x2="32" y2="56" />
    <line x1="8" y1="32" x2="56" y2="32" />
  </SVG>
)
