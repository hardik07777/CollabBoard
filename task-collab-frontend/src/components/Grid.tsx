"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface InteractiveGridPatternProps {
  className?: string
  children?: React.ReactNode
  cellSize?: number
  proximity?: number
}

export function InteractiveGridPattern({
  className,
  children,
  cellSize = 35,
  proximity = 120,
}: InteractiveGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [grid, setGrid] = useState({ rows: 0, cols: 0, scale: 1 })
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [center, setCenter] = useState({ x: 0, y: 0 })

  const borderColor = "rgba(0,0,0,"
  const hoverColor = "rgba(0,0,0,0.15)"

  const updateGrid = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    const scale = Math.max(1, Math.min(width, height) / 900)
    const scaledCellSize = cellSize * scale

    const cols = Math.ceil(width / scaledCellSize) + 1
    const rows = Math.ceil(height / scaledCellSize) + 1

    setCenter({ x: width / 2, y: height / 2 })
    setGrid({ rows, cols, scale })
  }, [cellSize])

  useEffect(() => {
    updateGrid()
    const ro = new ResizeObserver(updateGrid)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [updateGrid])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 })
    setHoveredCell(null)
  }

  const scaledCellSize = cellSize * grid.scale
  const scaledProximity = proximity * grid.scale

  const maxDistance = Math.sqrt(center.x ** 2 + center.y ** 2)

  return (
    <div
      ref={containerRef}
      className={cn("absolute top-0 left-0 w-full h-full overflow-hidden bg-white", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0">
        {Array.from({ length: grid.rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {Array.from({ length: grid.cols }).map((_, colIndex) => {
              const index = rowIndex * grid.cols + colIndex

              const cellX = colIndex * scaledCellSize + scaledCellSize / 2
              const cellY = rowIndex * scaledCellSize + scaledCellSize / 2

              // distance from center (for fade effect)
              const dxCenter = center.x - cellX
              const dyCenter = center.y - cellY
              const centerDistance = Math.sqrt(dxCenter ** 2 + dyCenter ** 2)

              const fade = 1 - centerDistance / maxDistance
              const opacity = Math.max(0, fade * 0.15)

              // mouse proximity effect
              const dx = mousePos.x - cellX
              const dy = mousePos.y - cellY
              const distance = Math.sqrt(dx * dx + dy * dy)

              const proximityFactor = Math.max(0, 1 - distance / scaledProximity)
              const isHovered = hoveredCell === index

              return (
                <div
                  key={index}
                  className="shrink-0 border transition-colors duration-500"
                  style={{
                    width: scaledCellSize,
                    height: scaledCellSize,
                    borderColor: `${borderColor}${opacity})`,
                    backgroundColor: isHovered
                      ? hoverColor
                      : proximityFactor > 0
                      ? `rgba(0,0,0,${proximityFactor * 0.05})`
                      : "transparent",
                  }}
                  onMouseEnter={() => setHoveredCell(index)}
                  onMouseLeave={() => setHoveredCell(null)}
                />
              )
            })}
          </div>
        ))}
      </div>

      {children && (
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      )}
    </div>
  )
}

export default InteractiveGridPattern