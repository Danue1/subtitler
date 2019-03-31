import React, { FC, memo, useRef } from 'react'
import styled from 'styled-components'
import { Grid } from '../../../Atomics/Grid'
import { Div } from '../../../Atomics/Div'
import { Hash } from '../useSubtitleList/Hash'
import { SubtitleListDispatch } from '../useSubtitleList'
import { TimeRange } from '../useSubtitleList/TimeRange'
import { Buttons } from './Buttons'

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
  grid-template-columns: min-content min-content min-content 1fr min-content;

  padding: 0.5rem;
  padding-left: 1rem;

  border-bottom: 2px solid transparent;

  &:hover {
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

const Time = styled(Div)`
  cursor: pointer;

  padding: 0.75rem;

  color: hsl(0 0% 64%);

  &:hover,
  &:focus {
    background-color: white;
    box-shadow: inset 0 0 0 1px hsl(210 100% 84%);
  }
`

interface Props {
  readonly index: number
  readonly timeRange: TimeRange
  readonly text: string
  readonly hash: Hash
  readonly dispatch: SubtitleListDispatch
}

const resizeTextareaHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = `auto` // inducing DOM side-effect for resetting HTMLTextareaElement height
  textarea.style.height = `${textarea.scrollHeight}px`
}

const SubtitleComponent: FC<Props> = ({ index, timeRange, text, hash, dispatch }) => {
  const layoutRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const updateTextarea = (hash: number, currentTarget: HTMLTextAreaElement) => {
    dispatch({ type: 'edit::text', hash, text: currentTarget.value })
    resizeTextareaHeight(currentTarget)
  }

  return (
    <Layout ref={layoutRef}>
      <Index>#{index}</Index>
      <Time>{timeRange.startsAt.toString()}</Time>
      <Time>{timeRange.endsAt.toString()}</Time>
      <Textarea
        ref={textareaRef}
        rows={1}
        defaultValue={text}
        onChange={({ currentTarget }) => updateTextarea(hash, currentTarget)}
      />
      <Buttons hash={hash} layoutRef={layoutRef} textareaRef={textareaRef} dispatch={dispatch} />
    </Layout>
  )
}

export const Subtitle = memo(SubtitleComponent, (previous, next) => previous.text === next.text)
