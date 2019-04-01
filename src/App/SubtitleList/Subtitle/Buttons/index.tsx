import React, { FC, memo, RefObject } from 'react'
import styled from 'styled-components'
import { Grid } from '../../../../Atomics/Grid'
import { Div } from '../../../../Atomics/Div'
import { Plus } from '../../../../Components/Icons/Plus'
import { Cross } from '../../../../Components/Icons/Cross'
import { useSubtitleList } from '../../../Context/SubtitleList'
import { Hash } from '../../../Context/SubtitleList/Hash'

const Layout = styled(Grid.Horizontal)`
  cursor: pointer;

  grid-gap: 0.5rem;
  align-content: space-between;
`

const Button = styled(Div)`
  width: 2.5rem;
  height: 2.5rem;

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

interface Props {
  readonly hash: Hash
  readonly layoutRef: RefObject<HTMLDivElement>
  readonly textareaRef: RefObject<HTMLTextAreaElement>
}

const ButtonsComponent: FC<Props> = ({ hash, layoutRef, textareaRef }) => {
  const [, dispatchSubtitleList] = useSubtitleList()

  const addAddingHint = () => {
    layoutRef.current!.classList.add('AddingHint')
  }

  const removeAddingHint = () => {
    layoutRef.current!.classList.remove('AddingHint')
  }

  const addRemovingHint = () => {
    layoutRef.current!.classList.add('RemovingHint')
    textareaRef.current!.classList.add('RemovingHint')
  }

  const removeRemovingHint = () => {
    layoutRef.current!.classList.remove('RemovingHint')
    textareaRef.current!.classList.remove('RemovingHint')
  }

  return (
    <Layout>
      <AddButton
        onMouseEnter={addAddingHint}
        onMouseLeave={removeAddingHint}
        onClick={() => dispatchSubtitleList({ type: 'add', hash })}
      >
        <Plus />
      </AddButton>
      <RemoveButton
        onMouseEnter={addRemovingHint}
        onMouseLeave={removeRemovingHint}
        onClick={() => dispatchSubtitleList({ type: 'remove', hash })}
      >
        <Cross />
      </RemoveButton>
    </Layout>
  )
}

export const Buttons = memo(ButtonsComponent, () => false)
