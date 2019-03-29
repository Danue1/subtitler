import React, { FC } from 'react'
import styled from 'styled-components'
import { Div } from '../Atomics/Div'

const Layout = Div

const Header = styled.header``

const Title = Div

const Main = styled.main``

const Left = Div

const SubtitleList = Div

const Right = Div

const Video = Div

const Timeline = Div

export const App: FC = () => (
  <Layout>
    <Header>
      <Title>Subtitler</Title>
    </Header>
    <Main>
      <Left>
        <SubtitleList>SubtitleList</SubtitleList>
      </Left>
      <Right>
        <Video>Video</Video>
        <Timeline>Timeline</Timeline>
      </Right>
    </Main>
  </Layout>
)
