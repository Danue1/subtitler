import React, { FC, memo, useRef, ChangeEventHandler, MouseEventHandler } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Grid } from '../../../Atomics/Grid'
import { Div } from '../../../Atomics/Div'
import { Buttons } from './Buttons'
import { useSubtitleList } from '../../Context/SubtitleList'
import { Subtitle as ISubtitle } from '../../Context/SubtitleList/Subtitle'
import { Times } from './Times'
import { useCurrentSubtitle } from '../../Context/CurrentSubtitle'

const Textarea = styled.textarea`
  overflow: hidden;
  resize: none;

  color: hsl(0 0% 36%);
  border: 1px solid hsl(0 0% 92%);

  &:hover,
  &:focus {
    border-color: hsl(210 100% 84%);
  }

  &:focus.RemovingHint {
    border-color: hsl(0 0% 84%);
  }
`

const Layout = styled(Grid.Horizontal)`
  grid-gap: 0.5rem;
  grid-template-columns: min-content min-content 1fr min-content;

  padding: 0.5rem;
  padding-left: 1rem;

  border-bottom: 2px solid transparent;

  &:hover,
  &.Selected {
    background-color: hsl(0 0% 96%);

    ${Textarea} {
      background-color: white;
    }
  }

  &.RemovingHint {
    &:hover {
      background-color: hsl(0 100% 96%);
    }
  }

  &.AddingHint {
    &:hover {
      border-bottom-color: hsl(210 100% 84%);
    }
  }
`

const Index = styled(Div)`
  width: 5ch;

  padding: 0.75rem 0;

  color: hsl(0 0% 64%);
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

  const selectCurrentSubtitle: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation()
    dispatchCurrentSubtitle({ type: 'select', subtitle })
  }

  const updateTextarea: ChangeEventHandler<HTMLTextAreaElement> = ({ currentTarget }) => {
    dispatchSubtitleList({ type: 'edit::text', hash: subtitle.hash, text: currentTarget.value })
    resizeTextareaHeight(currentTarget)
  }

  return (
    <Layout ref={layoutRef} className={layoutClassName} onClick={selectCurrentSubtitle}>
      <Index>#{index}</Index>
      <Times index={index} subtitle={subtitle} />
      <Textarea ref={textareaRef} rows={1} defaultValue={subtitle.text} onChange={updateTextarea} />
      <Buttons hash={subtitle.hash} layoutRef={layoutRef} textareaRef={textareaRef} />
    </Layout>
  )
}

export const Subtitle = memo(SubtitleComponent, (previous, next) => previous.subtitle.text === next.subtitle.text)
