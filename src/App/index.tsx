import React, { FC } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { SubtitleList } from './SubtitleList'
import { VideoPlayer } from './VideoPlayer'
import { Timeline } from './Timeline'
import { Grid } from '../Atomics/Grid'
import { Div } from '../Atomics/Div'
import { AppProvider } from './Context'

const Layout = styled(Div)`
  width: 100vw;
  height: 100vh;

  padding-top: 3rem;
`

const Main = styled(Grid.Horizontal)`
  grid-gap: 1rem;
  grid-template:
    'SubtitleList VideoPlayer' 18rem
    'Timeline Timeline' 1fr
    / 1fr min-content;

  max-width: var(--max-width);
  width: 100%;
  height: 100%;

  margin: 0 auto;
  padding: 1rem;

  background-color: white;
  box-shadow: 0 0 0 1px hsl(0 0% 84%);
`

const SubtitleListItem = styled(Div)`
  grid-area: SubtitleList;
`

const VideoPlayerItem = styled(Div)`
  grid-area: VideoPlayer;
`

const TimelineItem = styled(Div)`
  grid-area: Timeline;
`

export const App: FC = () => (
  <>
    <Header />
    <Layout>
      <Main as="main">
        <AppProvider>
          <SubtitleListItem>
            <SubtitleList />
          </SubtitleListItem>
          <VideoPlayerItem>
            <VideoPlayer />
          </VideoPlayerItem>
          <TimelineItem>
            <Timeline />
          </TimelineItem>
        </AppProvider>
      </Main>
    </Layout>
  </>
)
