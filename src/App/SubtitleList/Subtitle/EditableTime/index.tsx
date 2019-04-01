import React, { FC, memo } from 'react'
import styled from 'styled-components'
import { Div } from '../../../../Atomics/Div'
import { Grid } from '../../../../Atomics/Grid'
import { ShiftLeft } from '../../../../Components/Icons/ShiftLeft'
import { ShiftRight } from '../../../../Components/Icons/ShiftRight'
import { Time } from '../../../Context/SubtitleList/Time'
import { Hash } from '../../../Context/SubtitleList/Hash'

const Layout = styled(Div)`
  position: relative;
  cursor: pointer;

  color: hsl(0 0% 64%);

  &:hover {
    background-color: white;
    box-shadow: inset 0 0 0 1px hsl(210 100% 84%);
  }
`

const TimeLayout = styled(Div)`
  padding: 0.75rem;
`

const HandlerLayout = styled(Grid.Horizontal)`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;

  grid-template-columns: 2.5rem 1fr 2.5rem;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
`

const Handler = styled(Div)`
  width: 2.5rem;
  height: 2.5rem;

  padding: 0.25rem;

  svg {
    stroke: none;
  }

  &:hover {
    background-color: white;
    box-shadow: inset 0 0 0 1px hsl(210 100% 84%);

    svg {
      stroke: currentColor;
    }
  }
`

const Space = styled(Div)`
  height: 100%;
`

interface Props {
  readonly time: Time
  readonly hash: Hash
  readonly openModal: () => void
}

const EditableTimeComponent: FC<Props> = ({ time, hash, openModal }) => {
  const increaseTime = () => {
    //
  }

  const decreaseTime = () => {
    //
  }

  return (
    <>
      <Layout>
        <TimeLayout>{time.toString()}</TimeLayout>
        <HandlerLayout>
          <Handler onClick={decreaseTime}>
            <ShiftLeft />
          </Handler>
          <Space onClick={openModal} />
          <Handler onClick={increaseTime}>
            <ShiftRight />
          </Handler>
        </HandlerLayout>
      </Layout>
    </>
  )
}

export const EditableTime = memo(EditableTimeComponent, (previous, next) => previous.time === next.time)
