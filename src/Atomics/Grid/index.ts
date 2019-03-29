import styled from 'styled-components'

const Layout = styled.div`
  display: grid;
`

export const Grid = {
  Layout,
  Vertical: styled(Layout)`
    grid-auto-flow: row;
  `,
  Horizontal: styled(Layout)`
    grid-auto-flow: column;
  `
}
