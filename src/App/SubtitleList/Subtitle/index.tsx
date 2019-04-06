import React, { FC, memo, useRef, ChangeEventHandler, EventHandler, SyntheticEvent, useEffect } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Grid } from '../../../Atomics/Grid'
import { Buttons } from './Buttons'
import { useSubtitleList } from '../../Context/SubtitleList'
import { Subtitle as ISubtitle } from '../../Context/SubtitleList/Subtitle'
import { Times } from './Times'
import { useCurrentSubtitle } from '../../Context/CurrentSubtitle'
import { HashTag } from '../../../Components/Icons/HashTag'

const Textarea = styled.textarea`
  overflow: hidden;
  resize: none;

  color: hsl(0 0% 36%);
  box-shadow: 0 0 0 1px hsl(0 0% 92%);

  &:hover,
  &:focus {
    box-shadow: 0 0 0 1px hsl(210 100% 84%);
  }

  &:focus.RemovingHint {
    box-shadow: 0 0 0 1px hsl(0 0% 84%);
  }
`

const Layout = styled(Grid.Horizontal)`
  grid-gap: 0.5rem;
  grid-template-columns: min-content min-content 1fr min-content;

  padding: 0.25rem;
  padding-left: 1rem;

  border-bottom: 2px solid transparent;

  &:hover,
  &.Selected {
    background-color: hsl(0 0% 96%);

    ${Textarea} {
      background-color: white;
    }
  }

  &:hover {
    &.RemovingHint {
      background-color: hsl(0 100% 96%);
    }

    &.AddingHint {
      border-bottom-color: hsl(210 100% 84%);
    }
  }
`

const Index = styled(Grid.Horizontal)`
  align-items: center;
  grid-template-columns: 1.5rem 5ch;

  height: 2.5rem;

  color: hsl(0 0% 64%);
`

const SkewedText = styled.span`
  transform: skew(-8deg);
`

interface Props {
  readonly index: number
  readonly subtitle: ISubtitle
}

const resizeTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = `auto` // inducing DOM side-effect for resetting HTMLTextareaElement height
  textarea.style.height = `${textarea.scrollHeight}px`
}

const SubtitleComponent: FC<Props> = ({ index, subtitle }) => {
  const [, dispatchSubtitleList] = useSubtitleList()
  const [currentSubtitle, dispatchCurrentSubtitle] = useCurrentSubtitle()

  const layoutRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const layoutClassName = classNames({
    Selected: subtitle.hash === currentSubtitle.hash
  })

  const selectCurrentSubtitle: EventHandler<SyntheticEvent<Element>> = event => {
    event.stopPropagation()
    dispatchCurrentSubtitle({ type: 'select', subtitle })
  }

  const updateTextarea: ChangeEventHandler<HTMLTextAreaElement> = ({ currentTarget }) => {
    dispatchSubtitleList({ type: 'edit::text', hash: subtitle.hash, text: currentTarget.value })
    resizeTextareaHeight(currentTarget)
  }

  return (
    <Layout ref={layoutRef} className={layoutClassName} onClick={selectCurrentSubtitle}>
      <Index>
        <HashTag />
        <SkewedText>{index + 1}</SkewedText>
      </Index>
      <Times index={index} subtitle={subtitle} />
      <Textarea
        ref={textareaRef}
        rows={1}
        spellCheck={false}
        defaultValue={subtitle.text}
        onFocus={selectCurrentSubtitle}
        onChange={updateTextarea}
      />
      <Buttons hash={subtitle.hash} layoutRef={layoutRef} textareaRef={textareaRef} />
    </Layout>
  )
}

export const Subtitle = memo(
  SubtitleComponent,
  (previous, next) => previous.index === next.index && previous.subtitle === next.subtitle
)
