import React, { FC } from 'react'
import styled from 'styled-components'
import { useSubtitleList } from './useSubtitleList'
import { Div } from '../../Atomics/Div'
import { Subtitle } from './Subtitle'

const Layout = styled(Div)`
  overflow: hidden;

  border-radius: 0.25rem;

  &:hover {
    box-shadow: 0 0 0 1px hsl(0 0% 92%);
  }
`

const Scroll = styled(Div)`
  overflow: hidden scroll;

  height: calc(100vh - 5rem);
`

export const SubtitleList: FC = () => {
  const [subtitleList, dispatchSubtitleList] = useSubtitleList()

  return (
    <Layout>
      <Scroll>
        {subtitleList.map(({ timeRange, text, hash }, index) => (
          <Subtitle
            key={hash}
            index={index}
            timeRange={timeRange}
            text={text}
            hash={hash}
            dispatch={dispatchSubtitleList}
          />
        ))}
      </Scroll>
    </Layout>
  )
}
