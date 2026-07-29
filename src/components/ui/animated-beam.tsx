"use client"

import { useEffect, useId, useState, type RefObject } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  pathType?: "curved" | "orthogonal" | "l-shape" | "sharp"
  borderRadius?: number
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  repeat?: number
  repeatDelay?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  pathType = "curved",
  borderRadius = 16,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset

        let d = ""

        if (pathType === "sharp") {
          // Sharp 90-degree 3-segment stepped path
          const midY = startY + (endY - startY) / 2
          d = `M ${startX},${startY} L ${startX},${midY} L ${endX},${midY} L ${endX},${endY}`
        } else if (pathType === "l-shape") {
          // 2-segment L-corner (vertical then horizontal) with rounded elbow
          const dirY = endY > startY ? 1 : -1
          const dirX = endX > startX ? 1 : -1
          const r = Math.min(
            borderRadius,
            Math.abs(endY - startY),
            Math.abs(endX - startX)
          )

          if (r <= 0 || startX === endX || startY === endY) {
            d = `M ${startX},${startY} L ${startX},${endY} L ${endX},${endY}`
          } else {
            d = `M ${startX},${startY} L ${startX},${endY - r * dirY} Q ${startX},${endY} ${startX + r * dirX},${endY} L ${endX},${endY}`
          }
        } else if (pathType === "orthogonal") {
          // 3-segment circuit-style path (vertical, horizontal, vertical) with rounded corners
          const midY = startY + (endY - startY) / 2
          const r = Math.min(
            borderRadius,
            Math.abs(midY - startY),
            Math.abs(endX - startX) / 2
          )

          if (r <= 0 || startX === endX || startY === endY) {
            d = `M ${startX},${startY} L ${startX},${midY} L ${endX},${midY} L ${endX},${endY}`
          } else {
            const dirY1 = midY > startY ? 1 : -1
            const dirX = endX > startX ? 1 : -1
            const dirY2 = endY > midY ? 1 : -1

            d = `M ${startX},${startY} ` +
              `L ${startX},${midY - r * dirY1} ` +
              `Q ${startX},${midY} ${startX + r * dirX},${midY} ` +
              `L ${endX - r * dirX},${midY} ` +
              `Q ${endX},${midY} ${endX},${midY + r * dirY2} ` +
              `L ${endX},${endY}`
          }
        } else {
          // Default Bezier curve
          const controlY = startY - curvature
          d = `M ${startX},${startY} Q ${
            (startX + endX) / 2
          },${controlY} ${endX},${endY}`
        }

        setPathD(d)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePath()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    updatePath()

    return () => {
      resizeObserver.disconnect()
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    pathType,
    borderRadius,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat,
            repeatDelay,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  )
}