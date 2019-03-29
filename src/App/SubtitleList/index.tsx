import React, { FC, FocusEventHandler, ChangeEventHandler, MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
import { useSubtitleList } from './useSubtitleList'
import { Div } from '../../Atomics/Div'
import { Grid } from '../../Atomics/Grid'

const Layout = styled(Div)`
  overflow: hidden;

  border-radius: 0.25rem;

  &:hover {
    box-shadow: 0 0 0 1px hsl(0 0% 84%);
  }
`

const Scroll = styled(Div)`
  overflow: hidden scroll;

  height: calc(100vh - 5rem);
`

const Textarea = styled.textarea`
  resize: none;

  box-shadow: 0 0 0 0.5px hsl(0 0% 84%);

  &:hover,
  &:focus {
    box-shadow: 0 0 0 0.5px hsl(0 0% 64%);
  }
`

const UnhintedSubtitle = styled(Grid.Horizontal)`
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
`

const RemovingHintedSubtitle = styled(UnhintedSubtitle)`
  &:hover {
    background-color: hsl(0 100% 96%);
  }
`

const AddingHintedSubtitle = styled(UnhintedSubtitle)`
  border-bottom-color: hsl(210 100% 84%);
`

const Times = styled(Grid.Layout)`
  grid-gap: 0.5rem;
  grid-auto-rows: min-content;

  padding: 0.5rem;
`

const Time = styled.input`
  width: 11ch;

  padding: 0.25rem;

  &:hover,
  &:focus {
    background-color: white;
    box-shadow: 0 0 0 1px hsl(0 0% 84%);
  }
`

const RemoveButton = styled(Div)`
  &:hover {
    box-shadow: 0 0 0 1px hsl(0 100% 84%);
  }
`

const AddButton = styled(Div)`
  &:hover {
    box-shadow: 0 0 0 1px hsl(210 100% 84%);
  }
`

const Buttons = styled(Grid.Layout)`
  cursor: pointer;

  grid-gap: 0.5rem;

  ${RemoveButton},
  ${AddButton} {
    padding: 0.5rem;

    &:hover {
      background-color: white;
    }
  }
`

type OnBlurFromTime = FocusEventHandler<HTMLInputElement>
type OnChangeTextarea = ChangeEventHandler<HTMLTextAreaElement>

export const SubtitleList: FC = () => {
  const [subtitleList, dispatchSubtitleList] = useSubtitleList()

  const [addingHintIndex, setAddingHintIndex] = useState<number>(-1)
  const [removingHintIndex, setRemovingHintIndex] = useState<number>(-1)

  const updateStartsAt = (index: number): OnBlurFromTime => event => {
    dispatchSubtitleList({ type: 'edit::startsAt', index, startsAt: event.target.value })
  }

  const updateEndsAt = (index: number): OnBlurFromTime => event => {
    dispatchSubtitleList({ type: 'edit::endsAt', index, endsAt: event.target.value })
  }

  const onChangeTextarea = (index: number): OnChangeTextarea => ({ currentTarget }) => {
    currentTarget.style.height = `auto` // inducing DOM side-effect for resetting HTMLTextareaElement height
    currentTarget.style.height = `${currentTarget.scrollHeight}px`

    dispatchSubtitleList({ type: 'edit::text', index, text: currentTarget.value })
  }

  const displayHintToRemovingCurrentSubtitle = (index: number) => () => setRemovingHintIndex(index)

  const clearHintToRemovingCurrentSubtitle = () => setRemovingHintIndex(-1)

  const displayHintToAddingNewSubtitle = (index: number) => () => setAddingHintIndex(index)

  const clearHintTOAddingNewSubtitle = () => setAddingHintIndex(-1)

  return (
    <Layout>
      <Scroll>
        {subtitleList.map(({ startsAt, endsAt, text }, index) => {
          const Subtitle =
            index === removingHintIndex
              ? RemovingHintedSubtitle
              : index === addingHintIndex
              ? AddingHintedSubtitle
              : UnhintedSubtitle
          return (
            <Subtitle key={index}>
              <Times>
                <Time defaultValue={startsAt} onBlur={updateStartsAt(index)} />
                <Time defaultValue={endsAt} onBlur={updateEndsAt(index)} />
              </Times>
              <Textarea defaultValue={text} rows={2} onChange={onChangeTextarea(index)} />
              <Buttons>
                <RemoveButton
                  onMouseEnter={displayHintToRemovingCurrentSubtitle(index)}
                  onMouseLeave={clearHintToRemovingCurrentSubtitle}
                >
                  X
                </RemoveButton>
                <AddButton
                  onMouseEnter={displayHintToAddingNewSubtitle(index)}
                  onMouseLeave={clearHintTOAddingNewSubtitle}
                >
                  +
                </AddButton>
              </Buttons>
            </Subtitle>
          )
        })}
      </Scroll>
    </Layout>
  )
}
