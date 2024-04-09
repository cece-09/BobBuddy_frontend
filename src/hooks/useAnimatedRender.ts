import { MS } from "@/types/common.types"
import { useCallback, useLayoutEffect, useState } from "react"

export enum AnimationDirection {
  TOP_TO_BOTTOM = "TOP_TO_BOTTOM",
  BOTTOM_TO_TOP = "BOTTOM_TO_TOP",
}

interface UseAnimatedRenderProps {
  direction: AnimationDirection
  targetRef: React.RefObject<HTMLElement>
  transitionMs?: MS
  transitionOption?: string
  margin?: number
}

const DEFAULT_VERTICAL_MARGIN = 20
export const useAnimatedRender = ({
  direction,
  targetRef,
  transitionMs = 500,
  transitionOption = "ease-in-out",
  margin = DEFAULT_VERTICAL_MARGIN,
}: UseAnimatedRenderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const getOriginalPosition = useCallback(
    (size: number) => {
      switch (direction) {
        case AnimationDirection.BOTTOM_TO_TOP:
          return { position: "absolute", top: undefined, bottom: `-${size}px` }
        case AnimationDirection.TOP_TO_BOTTOM:
          return { position: "absolute", top: `-${size}px`, bottom: undefined }
      }
    },
    [direction],
  )

  const getTransform = useCallback(
    (heigt: number) => {
      const translate = "translateY"
      const sign =
        (direction === AnimationDirection.BOTTOM_TO_TOP && isOpen) ||
        (direction === AnimationDirection.TOP_TO_BOTTOM && !isOpen)
          ? -1
          : 1

      return {
        transform: `${translate}(${(heigt + margin) * sign}px)`,
      }
    },
    [direction, isOpen, margin],
  )

  useLayoutEffect(() => {
    if (targetRef.current === null) {
      return
    }

    const { clientHeight: height } = targetRef.current
    const transform = getTransform(height)
    const position = getOriginalPosition(height)
    const transitionDuration = transitionMs / 1000

    const positionStyle: Partial<CSSStyleDeclaration> = {
      ...position,
      ...transform,
      transitionDuration: `${transitionDuration}s`,
      transitionTimingFunction: transitionOption,
      transitionProperty: "transform",
    }

    Object.assign(targetRef.current.style, positionStyle)
  }, [
    getOriginalPosition,
    getTransform,
    targetRef,
    transitionOption,
    transitionMs,
  ])

  return {
    unmount: () => setIsOpen(false),
  }
}
