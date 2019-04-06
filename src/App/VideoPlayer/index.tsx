import React, { FC, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Div } from '../../Atomics/Div'
import { useSubtitleList } from '../Context/SubtitleList'

const Layout = styled(Div)`
  overflow: hidden;

  width: 32rem;
  height: 18rem;

  border-radius: 0.25rem;
`

const Video = styled.video`
  width: 100%;
`

export const VideoPlayer: FC = () => {
  const [subtitleList] = useSubtitleList()

  const videoRef = useRef<HTMLVideoElement>(null)

  const [source, setSource] = useState('')

  const updateSource = () => {
    const source = require('../../assets/video/alice_in_refriegerator.mp4')
    setSource(source)
  }
  useEffect(updateSource, [])

  const addTracks = () => {
    if (!videoRef.current) {
      return
    }

    const trackElement = videoRef.current.textTracks[0] || videoRef.current.addTextTrack('subtitles')
    trackElement.mode = 'showing'
    const cueList = subtitleList.map(({ timeRange: { startsAt, endsAt }, text }) => {
      const cue = new VTTCue(startsAt.valueOf(), endsAt.valueOf(), text)
      trackElement.addCue(cue)
      return cue
    })

    return () => {
      cueList.forEach(cue => trackElement.removeCue(cue))
    }
  }
  useEffect(addTracks, [source, subtitleList])

  return <Layout>{source && <Video key={source} ref={videoRef} src={source} autoPlay controls />}</Layout>
}
