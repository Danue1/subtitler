import React, { FC } from 'react'
import { SubtitleListProvider } from './SubtitleList'
import { CurrentSubtitleProvider } from './CurrentSubtitle'
import { MaximumProvider } from './MaximumTime'

export const AppProvider: FC = ({ children }) => (
  <SubtitleListProvider>
    <CurrentSubtitleProvider>
      <MaximumProvider>{children}</MaximumProvider>
    </CurrentSubtitleProvider>
  </SubtitleListProvider>
)
