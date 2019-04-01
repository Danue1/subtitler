import React, { FC } from 'react'
import { SubtitleListProvider } from './SubtitleList'
import { CurrentSubtitleProvider } from './CurrentSubtitle'

export const AppProvider: FC = ({ children }) => (
  <SubtitleListProvider>
    <CurrentSubtitleProvider>{children}</CurrentSubtitleProvider>
  </SubtitleListProvider>
)
