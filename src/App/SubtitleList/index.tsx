import React, { FC } from 'react'
import styled from 'styled-components'
import { Div } from '../../Atomics/Div'
import { Subtitle } from './Subtitle'
import { useSubtitleList } from '../Context/SubtitleList'
import { useCurrentSubtitle } from '../Context/CurrentSubtitle'
import { Grid } from '../../Atomics/Grid'

const Layout = styled(Grid.Horizontal)`
  overflow: hidden;

  height: 100%;

  border-radius: 0.25rem;

  transition-property: box-shadow;

  &:hover {
    box-shadow: 0 0 0 1px hsl(0 0% 92%);
  }
`

const Scroll = styled(Div)`
  overflow: hidden scroll;
  scroll-behavior: smooth;
`

export const SubtitleList: FC = () => {
  const [subtitleList] = useSubtitleList()
  const [, dispatchCurrentSubtitle] = useCurrentSubtitle()

  const resetCurrentSubtitle = () => {
    dispatchCurrentSubtitle({ type: 'reset' })
  }

  return (
    <Layout onClick={resetCurrentSubtitle}>
      <Scroll>
        {subtitleList.map((subtitle, index) => (
          <Subtitle key={subtitle.hash} index={index} subtitle={subtitle} />
        ))}
      </Scroll>
    </Layout>
  )
}
