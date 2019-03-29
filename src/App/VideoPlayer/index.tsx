import React, { FC } from 'react'
import styled from 'styled-components'
import { Div } from '../../Atomics/Div'

const Layout = styled(Div)`
  width: 32rem;
  height: 18rem;

  border: 1px solid hsl(0 0% 84%);
`

export const VideoPlayer: FC = () => <Layout>VideoPlayer</Layout>
