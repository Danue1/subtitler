import React, { FC } from 'react'
import styled from 'styled-components'
import { Div } from '../../Atomics/Div'
import { Grid } from '../../Atomics/Grid'

const Fixed = styled(Grid.Horizontal)`
  position: fixed;
  top: 0;
  left: 0;

  align-items: center;

  width: 100vw;
  height: 3rem;

  background-color: white;
  border-bottom: 1px solid hsl(0 0% 84%);
`

const Layout = styled(Grid.Horizontal)`
  max-width: var(--max-width);
  width: 100%;

  margin: 0 auto;
  padding: 0 1rem;
`

const Title = Div

export const Header: FC = () => (
  <Fixed>
    <Layout>
      <Title>Subtitler</Title>
    </Layout>
  </Fixed>
)
