import React, { FC } from 'react'
import styled from 'styled-components'
import { Div } from '../../Atomics/Div'
import { Subtitle } from './Subtitle'
import { useSubtitleList } from '../Context/SubtitleList'
import { useCurrentSubtitle } from '../Context/CurrentSubtitle'
import { Grid } from '../../Atomics/Grid'

const Layout = styled(Grid.Horizontal)`
  overflow: hidden;

  border-radius: 0.25rem;

  &:hover {
    box-shadow: 0 0 0 1px hsl(0 0% 92%);
  }
`

const Scroll = styled(Div)`
  overflow: hidden scroll;

  height: 18rem;
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
