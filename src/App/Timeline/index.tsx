import React, { FC } from 'react'
import styled from 'styled-components'
import { SubtitleList } from './SubtitleList'
import { TimeScale } from './TimeScale'
import { Grid } from '../../Atomics/Grid'

const Layout = styled(Grid.Layout)`
  overflow: scroll hidden;

  grid-gap: 0.5rem;
  grid-template-rows: min-content 1fr;

  height: 100%;

  border-top: 1px solid hsl(0 0% 84%);
  border-radius: 0.25rem;
`

export const Timeline: FC = () => (
  <Layout>
    <TimeScale />
    <SubtitleList />
  </Layout>
)
