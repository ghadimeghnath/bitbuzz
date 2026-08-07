"use client";

import React, { useEffect, useId, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  repeatDelay?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  reverse = false,
  duration = 4,
  delay = 0,
  pathColor = "#F3CA20",
  pathWidth = 3,
  pathOpacity = 0.50,
  gradientStartColor = "#F3CA20",
  gradientStopColor = "#EF9D10",
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");

  const [pathData, setPathData] = useState({
    d: "",
    length: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const lastPathD = useRef("");
  const lastSvgDimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const updatePath = () => {
      const container = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;

      if (!container || !fromEl || !toEl) return;

      const getLayoutBounds = (element: HTMLElement) => {
        let x = 0;
        let y = 0;
        let curr: HTMLElement | null = element;

        while (curr && curr !== container && container.contains(curr)) {
          x += curr.offsetLeft;
          y += curr.offsetTop;
          curr = curr.offsetParent as HTMLElement;
        }

        if (curr !== container) {
          const elRect = element.getBoundingClientRect();
          const cRect = container.getBoundingClientRect();
          return {
            left: elRect.left - cRect.left,
            top: elRect.top - cRect.top,
            width: elRect.width,
            height: elRect.height,
          };
        }

        return {
          left: x,
          top: y,
          width: element.offsetWidth,
          height: element.offsetHeight,
        };
      };

      const cBounds = {
        width: Math.round(container.offsetWidth),
        height: Math.round(container.offsetHeight),
      };

      const rectA = getLayoutBounds(fromEl);
      const rectB = getLayoutBounds(toEl);

      const startX = Math.round(rectA.left + rectA.width / 2 + startXOffset);
      const startY = Math.round(rectA.top + rectA.height + startYOffset);

      const endX = Math.round(rectB.left + rectB.width / 2 + endXOffset);
      const endY = Math.round(rectB.top + endYOffset);

      const deltaX = Math.abs(startX - endX);
      const deltaY = Math.abs(endY - startY);

      let d = "";
      let computedLength = 0;

      if (deltaX < 2) {
        d = `M ${startX},${startY} L ${endX},${endY}`;
        computedLength = deltaY;
      } else {
        const distanceY = endY - startY;
        let midY: number;

        if (distanceY > 130) {
          midY = Math.round(endY - 20);
        } else {
          midY = Math.round(startY + distanceY / 2);
        }

        d = `M ${startX},${startY} L ${startX},${midY} L ${endX},${midY} L ${endX},${endY}`;
        computedLength = deltaX + deltaY;
      }

      if (d !== lastPathD.current) {
        lastPathD.current = d;
        setPathData({
          d,
          length: computedLength,
          startX,
          startY,
          endX,
          endY,
        });
      }

      if (
        cBounds.width !== lastSvgDimensions.current.width ||
        cBounds.height !== lastSvgDimensions.current.height
      ) {
        lastSvgDimensions.current = cBounds;
        setSvgDimensions(cBounds);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updatePath);
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (fromRef.current) resizeObserver.observe(fromRef.current);
    if (toRef.current) resizeObserver.observe(toRef.current);

    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  const { d: pathD, length: pathLength, startX, startY, endX, endY } = pathData;
  const beamLength = Math.min(90, Math.max(20, pathLength * 0.35 || 60));
  const gapLength = pathLength * 2 + beamLength;

  const totalDuration = duration + repeatDelay;
  const activePct = totalDuration > 0 ? (duration / totalDuration) * 100 : 100;

  // Correct offset boundaries for full off-screen entry & exit
  const startOffset = reverse ? -pathLength : beamLength;
  const endOffset = reverse ? beamLength : -pathLength;

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width || 1} ${svgDimensions.height || 1}`}
    >
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="20%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="80%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>

        <style>{`
          @keyframes beam-dash-${id} {
            0% {
              stroke-dashoffset: ${startOffset}px;
            }
            ${activePct.toFixed(2)}% {
              stroke-dashoffset: ${endOffset}px;
            }
            100% {
              stroke-dashoffset: ${endOffset}px;
            }
          }
          .beam-animated-${id} {
            animation: beam-dash-${id} ${totalDuration}s linear infinite;
            animation-delay: ${delay}s;
          }
        `}</style>
      </defs>

      {/* Static Background Track */}
      {pathD && (
        <path
          d={pathD}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Smooth, Hardware-Accelerated Light Beam */}
      {pathD && pathLength > 0 && (
        <path
          d={pathD}
          className={`beam-animated-${id}`}
          stroke={`url(#${id})`}
          strokeWidth={pathWidth + 1}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${beamLength} ${gapLength}`}
        />
      )}
    </svg>
  );
};