"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MousePosition {
  x: number
  y: number
}

function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return mousePosition
}

export interface ParticlesProps {
  className?: string
  children?: React.ReactNode
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

function hexToRgb(hex: string): number[] {
  let normalized = hex.replace("#", "")

  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const hexInt = parseInt(normalized, 16)
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255]
}

export const StarfieldBackground: React.FC<ParticlesProps> = ({
  className,
  children,
  quantity = 120,
  staticity = 50,
  ease = 60,
  size = 1,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mousePosition = useMousePosition()
  const mouse = useRef({ x: 0, y: 0 })
  const canvasSize = useRef({ w: 0, h: 0 })
  const animationRef = useRef<number | null>(null)

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const rgb = hexToRgb(color)

  useEffect(() => {
    if (!canvasRef.current) return
    context.current = canvasRef.current.getContext("2d")

    initCanvas()
    animate()

    window.addEventListener("resize", initCanvas)

    return () => {
      window.removeEventListener("resize", initCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [color])

  useEffect(() => {
    onMouseMove()
  }, [mousePosition])

  useEffect(() => {
    initCanvas()
  }, [refresh])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const resizeCanvas = () => {
    if (!containerRef.current || !canvasRef.current || !context.current) return

    circles.current.length = 0
    canvasSize.current.w = containerRef.current.offsetWidth
    canvasSize.current.h = containerRef.current.offsetHeight

    canvasRef.current.width = canvasSize.current.w * dpr
    canvasRef.current.height = canvasSize.current.h * dpr
    canvasRef.current.style.width = `${canvasSize.current.w}px`
    canvasRef.current.style.height = `${canvasSize.current.h}px`

    context.current.scale(dpr, dpr)
  }

  const circleParams = (): Circle => ({
    x: Math.random() * canvasSize.current.w,
    y: Math.random() * canvasSize.current.h,
    translateX: 0,
    translateY: 0,
    size: Math.random() * 2 + size,
    alpha: 0,
    targetAlpha: Math.random() * 0.6 + 0.2,
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
    magnetism: 0.5 + Math.random() * 4,
  })

  const drawCircle = (circle: Circle, update = false) => {
    if (!context.current) return

    context.current.translate(circle.translateX, circle.translateY)
    context.current.beginPath()
    context.current.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI)
    context.current.fillStyle = `rgba(${rgb.join(",")}, ${circle.alpha})`
    context.current.fill()
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

    if (!update) circles.current.push(circle)
  }

  const clear = () => {
    context.current?.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
  }

  const drawParticles = () => {
    clear()
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams())
    }
  }

  const onMouseMove = () => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()

    mouse.current.x =
      mousePosition.x - rect.left - canvasSize.current.w / 2
    mouse.current.y =
      mousePosition.y - rect.top - canvasSize.current.h / 2
  }

  const animate = () => {
    clear()

    circles.current.forEach((circle, i) => {
      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.02
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy

      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease

      drawCircle(circle, true)

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1)
        drawCircle(circleParams())
      }
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden bg-[#0a0a0f]", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  )
}

export default StarfieldBackground