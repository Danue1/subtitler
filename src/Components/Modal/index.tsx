import React, { FC } from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  cursor: default;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;

  display: grid;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: hsl(0 0% 16% / 84%);
`

const Container = styled.div`
  position: relative;

  width: min-content;
  height: min-content;

  padding: 1rem;

  background-color: white;
`

export interface ModalHandlerProps {
  readonly closeModal: () => void
}

interface Props extends Partial<ModalHandlerProps> {
  readonly isOpen: boolean
}

export const Modal: FC<Props> = ({ isOpen, closeModal, children }) => {
  if (!isOpen) {
    return null
  }

  return (
    <Layout onClick={closeModal}>
      <Container>{children}</Container>
    </Layout>
  )
}
