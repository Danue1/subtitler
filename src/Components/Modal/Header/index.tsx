import React, { FC } from 'react'
import styled from 'styled-components'
import { ModalHandlerProps } from '..'
import { Cross } from '../../Icons/Cross'

const Layout = styled.div`
  display: grid;
  align-items: center;
  grid-template: '. Text CloseButton' / 2.5rem 1fr 2.5rem;
`

const Text = styled.div`
  grid-area: Text;
  justify-self: center;

  font-size: 1.25rem;
`

const CloseButton = styled.div`
  cursor: pointer;

  grid-area: CloseButton;

  padding: 0.5rem;

  border: 1px solid transparent;
  border-radius: 0.25rem;

  &:hover {
    color: hsl(0 50% 36%);
    border-color: hsl(0 50% 84%);
  }
`

interface Props extends Partial<ModalHandlerProps> {
  readonly name: string
}

export const Header: FC<Props> = ({ name, closeModal }) => (
  <Layout>
    <Text>{name}</Text>
    {closeModal && (
      <CloseButton onClick={closeModal}>
        <Cross />
      </CloseButton>
    )}
  </Layout>
)
