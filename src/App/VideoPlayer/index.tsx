import React, { FC } from 'react'
import styled from 'styled-components'
import { Div } from '../../Atomics/Div'

const Layout = styled(Div)`
  overflow: scroll hidden;

  width: 32rem;
  height: 18rem;

  border-radius: 0.25rem;
  box-shadow: 0 0 0 1px hsl(0 0% 92%);
`

export const VideoPlayer: FC = () => <Layout>VideoPlayer</Layout>
