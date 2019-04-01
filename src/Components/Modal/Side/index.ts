import styled from 'styled-components'

const Layout = styled.div`
  position: absolute;
  top: 0;

  padding: 1rem;

  background-color: white;
`

export const Side = {
  Left: styled(Layout)`
    right: 100%;

    margin-right: 0.5rem;
  `,
  Right: styled(Layout)`
    left: 100%;

    margin-left: 0.5rem;
  `
}
