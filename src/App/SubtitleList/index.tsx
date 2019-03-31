import React, { FC, useState } from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import { useSubtitleList } from './useSubtitleList'
import { Div } from '../../Atomics/Div'
import { Grid } from '../../Atomics/Grid'
import { Plus } from '../../Components/Icons/Plus'
import { Cross } from '../../Components/Icons/Cross'

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

const Textarea = styled.textarea`
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

const Subtitle = styled(Grid.Horizontal)`
  grid-gap: 0.5rem;
  grid-template-columns: min-content 1fr;

  padding: 0.5rem;

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

const Times = styled(Grid.Layout)`
  grid-gap: 0.5rem;
  grid-auto-rows: min-content;

  padding: 0.5rem;
`

const Time = styled(Div)`
  cursor: pointer;

  width: 10ch;

  padding: 0.25rem;

  color: hsl(0 0% 64%);

  &:hover,
  &:focus {
    background-color: white;
    box-shadow: 0 0 0 1px hsl(210 100% 84%);
  }
`

const Buttons = styled(Grid.Layout)`
  cursor: pointer;

  grid-gap: 0.5rem;
  align-content: space-between;
`

const Button = styled(Div)`
  width: 2rem;
  height: 2rem;

  padding: 0.5rem;

  border: 1px solid transparent;

  &:hover {
    background-color: white;
  }
`

const RemoveButton = styled(Button)`
  svg {
    stroke: hsl(0 100% 36%);
  }

  &:hover {
    border-color: hsl(0 100% 84%);
  }
`

const AddButton = styled(Button)`
  svg {
    stroke: hsl(210 100% 36%);
  }

  &:hover {
    border-color: hsl(210 100% 84%);
  }
`

export const SubtitleList: FC = () => {
  const [subtitleList, dispatchSubtitleList] = useSubtitleList()

  const [addingHintByHash, setAddingHintByHash] = useState<null | number>(null)
  const [removingHintByHash, setRemovingHintByHash] = useState<null | number>(null)

  const resizeTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = `auto` // inducing DOM side-effect for resetting HTMLTextareaElement height
    textarea.style.height = `${textarea.scrollHeight + 2}px`
  }

  const updateTextarea = (hash: number, currentTarget: HTMLTextAreaElement) => {
    dispatchSubtitleList({ type: 'edit::text', hash, text: currentTarget.value })
    resizeTextareaHeight(currentTarget)
  }

  const clearHintToRemovingCurrentSubtitle = () => setRemovingHintByHash(null)
  const clearHintToAddingNewSubtitle = () => setAddingHintByHash(null)

  return (
    <Layout>
      <Scroll>
        {subtitleList.map(({ timeRange, text, hash }) => {
          const subtitleClassNames = classnames({
            AddingHint: hash === addingHintByHash,
            RemovingHint: hash === removingHintByHash
          })
          const textareaClassNames = classnames({
            RemovingHint: hash === removingHintByHash
          })

          return (
            <Subtitle className={subtitleClassNames} key={hash}>
              <Times>
                <Time>{timeRange.startsAt.toString()}</Time>
                <Time>{timeRange.endsAt.toString()}</Time>
              </Times>
              <Textarea
                className={textareaClassNames}
                defaultValue={text}
                rows={2}
                onChange={({ currentTarget }) => updateTextarea(hash, currentTarget)}
              />
              <Buttons>
                <RemoveButton
                  onMouseEnter={() => setRemovingHintByHash(hash)}
                  onMouseLeave={clearHintToRemovingCurrentSubtitle}
                  onClick={() => dispatchSubtitleList({ type: 'remove', hash })}
                >
                  <Cross />
                </RemoveButton>
                <AddButton
                  onMouseEnter={() => setAddingHintByHash(hash)}
                  onMouseLeave={clearHintToAddingNewSubtitle}
                  onClick={() => dispatchSubtitleList({ type: 'add', hash })}
                >
                  <Plus />
                </AddButton>
              </Buttons>
            </Subtitle>
          )
        })}
      </Scroll>
    </Layout>
  )
}
