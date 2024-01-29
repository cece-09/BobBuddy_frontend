"use client"

import { ReactNode, useEffect, useState } from "react"

type GestureOption = "longPress" | "swipeLeft" | "swipeRight"

interface DetectorProp {
  children: ReactNode
  callback: () => void
}

/**
 * 터치 이벤트를 감지하고
 * 인자로 전달된 콜백함수를 실행합니다
 * @export
 * @param {{
 *   children: ReactNode
 *   option: GestureOption
 *   callback: () => void
 * }} {
 *   children,
 *   option,
 *   callback,
 * }
 * @return {*}
 */
export default function GestureDetector({
  children,
  option,
  callback,
}: {
  children: ReactNode
  option: GestureOption
  callback: () => void
}): JSX.Element {
  switch (option) {
    case "longPress":
      return <LongPressDetector {...{ callback, children }} />
    case "swipeLeft":
      return <SwipeLeftDetector {...{ callback, children }} />
    case "swipeRight":
      return <SwipeRightDetector {...{ callback, children }} />
    default:
      return <>{children}</>
  }
}

// long press
const LongPressDetector = ({
  children,
  callback,
}: {
  children: ReactNode
  callback: () => void
}) => {
  const LONG_PRESS_TIME: number = 1000
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const handleTouchStart = () => {
    const newTimer = setTimeout(() => {
      console.log("long press detected")
      callback()
    }, LONG_PRESS_TIME)
    setTimer(newTimer)
  }

  const handleTouchEnd = () => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
  }

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {children}
    </div>
  )
}

const SwipeLeftDetector = ({ children, callback }: DetectorProp) => {
  console.error("not implemented!")
  return <div>{children}</div>
}

const SwipeRightDetector = ({ children, callback }: DetectorProp) => {
  console.error("not implemented!")
  return <div>{children}</div>
}
