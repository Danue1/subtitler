import React, { FC } from 'react'
import styled from 'styled-components'
import { Div } from '../../Atomics/Div'
import { SubtitleList } from './SubtitleList'
import { TimeScale } from './TimeScale'

const Layout = styled(Div)`
  overflow: scroll hidden;

  height: 100%;

  border-radius: 0.25rem;
  box-shadow: 0 0 0 1px hsl(0 0% 92%);
`

export const Timeline: FC = () => (
  <Layout>
    <TimeScale />
    <SubtitleList />
  </Layout>
)
