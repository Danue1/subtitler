import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { Subtitle } from './Subtitle'
import { Div } from '../../../Atomics/Div'
import { useSubtitleList } from '../../Context/SubtitleList'
import { useCurrentSubtitle } from '../../Context/CurrentSubtitle'
import { Subtitle as ISubtitle } from '../../Context/SubtitleList/Subtitle'

const Layout = styled(Div)`
  position: relative;

  height: 2rem;
`

export const SubtitleList: FC = () => {
  const [subtitleList] = useSubtitleList()
  const [currentSubtitle, dispatchCurrentSubtitle] = useCurrentSubtitle()

  const selectSubtitle = (event: MouseEvent<HTMLDivElement>, subtitle: ISubtitle) => {
    event.stopPropagation()
    dispatchCurrentSubtitle({ type: 'select', subtitle })
  }

  return (
    <Layout onClick={() => dispatchCurrentSubtitle({ type: 'reset' })}>
      {subtitleList.map((subtitle, index) => (
        <Subtitle
          key={subtitle.hash}
          isSelected={subtitle === currentSubtitle}
          onSelect={event => selectSubtitle(event, subtitle)}
          index={index + 1}
          subtitle={subtitle}
        />
      ))}
    </Layout>
  )
}
