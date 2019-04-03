import { useMaximumTime } from '../../Context/MaximumTime'
import { useEffect, useRef } from 'react'
import { Time } from '../../Context/SubtitleList/Time'
import { TIME_SCALE_OFFSET_WIDTH, TIME_SCALE_RESOLUTION, TIME_SCALE_HEIGHT } from '../../../constants/TimeScale'

export const useTimeScale = () => {
  const [maximumTime] = useMaximumTime()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawTimeScale = () => {
    const context = canvasRef.current!.getContext('2d')!
    const path = new Path2D()
    const matrix = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix()

    path.moveTo(0, 0)
    path.lineTo(0, TIME_SCALE_HEIGHT)
    path.addPath(path, matrix)

    matrix.e = TIME_SCALE_OFFSET_WIDTH * TIME_SCALE_RESOLUTION
    path.addPath(path, matrix)

    let timeScaleCount = maximumTime.totalMinutes
    while (timeScaleCount > 2) {
      matrix.e *= 2
      path.addPath(path, matrix)
      timeScaleCount /= 2
    }

    context.lineWidth = 1
    context.strokeStyle = 'hsl(0 0% 84%)'
    context.stroke(path)
  }
  useEffect(drawTimeScale, [maximumTime])

  const drawTimeString = () => {
    const TIME_SCALE_OFFSET = TIME_SCALE_OFFSET_WIDTH * TIME_SCALE_RESOLUTION
    const HEIGHT = TIME_SCALE_HEIGHT * TIME_SCALE_RESOLUTION

    const context = canvasRef.current!.getContext('2d')!
    context.font = '24px serif'
    context.fillStyle = 'hsl(0 0% 36%)'
    context.textAlign = 'center'

    const timeScaleGenerator = generateTimeScale(maximumTime.time)

    const addTimeScale = () => {
      for (let index = 0; index < 100; index += 1) {
        const { done, value } = timeScaleGenerator.next()
        if (done) {
          return
        }
        context.fillText(value, timeIndex * TIME_SCALE_OFFSET, HEIGHT)
        timeIndex += 1
      }
      if (!isTimeChanged) {
        animationId = window.requestAnimationFrame(addTimeScale)
      }
    }

    let timeIndex = 0
    let animationId = window.requestAnimationFrame(addTimeScale)
    let isTimeChanged = false
    return () => {
      window.cancelAnimationFrame(animationId)
      isTimeChanged = true
    }
  }
  useEffect(drawTimeString, [maximumTime])

  return canvasRef
}

const generateTimeScale = function*(time: Time) {
  for (let hour = 0; hour < time.hours; hour += 1) {
    for (let minute = 0; minute < 60; minute += 1) {
      for (let second = 0; second < 60; second += 1) {
        yield buildTimeString(hour, minute, second)
      }
    }
  }
  for (let minute = 0; minute < time.minutes; minute += 1) {
    for (let second = 0; second < 60; second += 1) {
      yield buildTimeString(time.hours, minute, second)
    }
  }
  for (let second = 0; second < time.seconds; second += 1) {
    yield buildTimeString(time.hours, time.minutes, second)
  }
  yield buildTimeString(time.hours, time.minutes, time.seconds)
}

const buildTimeString = (hour: number, minute: number, second: number) =>
  second ? `${minute}:${second.toString().padStart(2, '0')}` : `${hour}:${minute}:00`
