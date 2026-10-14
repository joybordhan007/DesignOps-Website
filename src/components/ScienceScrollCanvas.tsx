import { useEffect, useRef } from "react"

const width = 1872

const height = 1080

const circleRadius = 292.5

const circleCenters = [
  { x: 790.5, y: 540 },

  { x: 1083.5, y: 540 },
]

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function ease(value: number) {
  const progress = clamp(value)

  return progress * progress * (3 - 2 * progress)
}

type PointerPosition = {
  x: number
  y: number
}

function drawScene(
  context: CanvasRenderingContext2D,
  progress: number,
  pointer: PointerPosition,
) {
  context.clearRect(0, 0, width, height)

  const build = ease(progress / 0.24)

  const orbit = ease((progress - 0.18) / 0.48)

  const convergence = ease((progress - 0.62) / 0.3)

  const pulse = Math.sin(progress * Math.PI * 10) * 0.5 + 0.5
  const pointerX = (pointer.x - 0.5) * 32
  const pointerY = (pointer.y - 0.5) * 24

  context.save()
  context.translate(pointerX * 0.18, pointerY * 0.18)

  const backdrop = context.createRadialGradient(937, 540, 80, 937, 540, 760)
  backdrop.addColorStop(0, `rgba(0, 182, 202, ${0.025 + convergence * 0.08})`)
  backdrop.addColorStop(1, "rgba(0, 182, 202, 0)")
  context.fillStyle = backdrop
  context.fillRect(0, 0, width, height)

  context.strokeStyle = `rgba(173, 232, 237, ${build * 0.055})`
  context.lineWidth = 1
  for (let x = 0; x <= width; x += 72) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, height)
    context.stroke()
  }
  for (let y = 0; y <= height; y += 72) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
  }

  const cyan = `rgba(0, 182, 202, ${0.22 + orbit * 0.55})`

  const white = `rgba(255, 255, 255, ${0.1 + build * 0.42})`

  for (let index = 0; index < 96; index += 1) {
    const seed = index * 127.1

    const x = (((Math.sin(seed) * 43758.5453) % 1) + 1) % 1

    const y = (((Math.sin(seed + 78.233) * 96321.912) % 1) + 1) % 1

    const twinkle = 0.16 + ((Math.sin(progress * 18 + index) + 1) / 2) * 0.55

    context.fillStyle = `rgba(228, 249, 252, ${twinkle * build * 0.5})`

    context.beginPath()

    context.arc(x * width, y * height, index % 7 === 0 ? 2 : 1, 0, Math.PI * 2)

    context.fill()
  }

  context.lineWidth = 1.5

  circleCenters.forEach((center, circleIndex) => {
    const turn =
      (circleIndex === 0 ? 1 : -1) * progress * 0.75 +
      (circleIndex === 0 ? pointerX : -pointerX) * 0.002

    const radius = circleRadius * (0.78 + build * 0.22)

    context.strokeStyle = white

    context.beginPath()

    context.arc(
      center.x,
      center.y,
      radius,
      -Math.PI / 2 + turn,
      -Math.PI / 2 + turn + Math.PI * 2 * build,
    )

    context.stroke()

    context.strokeStyle = `rgba(0, 182, 202, ${orbit * 0.68})`

    context.lineWidth = 2

    context.beginPath()

    context.arc(
      center.x,

      center.y,

      radius + 12 + pulse * 5,

      -Math.PI / 2 + turn + progress * 3,

      -Math.PI / 2 + turn + progress * 3 + Math.PI * (0.18 + orbit * 0.2),
    )

    context.stroke()

    for (let nodeIndex = 0; nodeIndex < 7; nodeIndex += 1) {
      const angle =
        (Math.PI * 2 * nodeIndex) / 7 + turn + progress * (circleIndex ? -2 : 2)

      const node = {
        x: center.x + Math.cos(angle) * radius,

        y: center.y + Math.sin(angle) * radius,
      }

      const dotAlpha = orbit * (0.45 + ((nodeIndex + circleIndex) % 3) * 0.16)

      context.fillStyle = `rgba(0, 214, 230, ${dotAlpha})`

      context.beginPath()

      context.arc(node.x, node.y, 2.5 + pulse * orbit * 2, 0, Math.PI * 2)

      context.fill()
    }
  })

  const center = { x: 937 + pointerX * 0.36, y: 540 + pointerY * 0.36 }
  const networkNodes = Array.from({ length: 12 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 12 - Math.PI / 2
    const radius = 360 + Math.sin(index * 2.4 + progress * 8) * 26

    return {
      x: 937 + Math.cos(angle) * radius,
      y: 540 + Math.sin(angle) * radius * 0.72,
      angle,
    }
  })

  networkNodes.forEach((node, index) => {
    const reveal = ease((progress - 0.24 - (index / 12) * 0.24) / 0.16)
    if (reveal <= 0) return

    const targetX = node.x + pointerX * 0.2
    const targetY = node.y + pointerY * 0.2

    context.strokeStyle = `rgba(0, 198, 216, ${reveal * (0.32 + convergence * 0.5)})`
    context.lineWidth = 1
    context.beginPath()
    context.moveTo(center.x, center.y)
    context.lineTo(targetX, targetY)
    context.stroke()

    for (let satellite = 1; satellite <= 3; satellite += 1) {
      const point = satellite / 4
      const particle = (progress * 1.8 + index * 0.137 + point) % 1
      const x = center.x + (targetX - center.x) * particle
      const y = center.y + (targetY - center.y) * particle
      const glow = context.createRadialGradient(x, y, 0, x, y, 12)
      glow.addColorStop(0, `rgba(0, 224, 238, ${reveal * 0.95})`)
      glow.addColorStop(1, "rgba(0, 224, 238, 0)")
      context.fillStyle = glow
      context.beginPath()
      context.arc(x, y, 12, 0, Math.PI * 2)
      context.fill()
    }

    context.fillStyle = `rgba(177, 250, 255, ${reveal * (0.72 + pulse * 0.28)})`
    context.beginPath()
    context.arc(targetX, targetY, 3 + reveal * 2 + pulse, 0, Math.PI * 2)
    context.fill()
  })

  context.save()

  context.translate(center.x, center.y)

  context.rotate(progress * Math.PI * 1.5 + pointerX * 0.002)

  for (let index = 0; index < 3; index += 1) {
    const radius =
      (42 + index * 30) * (0.45 + convergence * 0.9) +
      pulse * 8 * (0.25 + convergence)

    context.strokeStyle =
      index === 1 ? cyan : `rgba(255, 255, 255, ${0.18 + convergence * 0.48})`

    context.lineWidth = index === 1 ? 2.5 : 1.25

    context.beginPath()

    context.ellipse(
      0,
      0,
      radius,
      radius * (0.58 + index * 0.12 + pointerY * 0.001),
      index * 0.42 + progress * (index % 2 === 0 ? 1 : -1),
      0,
      Math.PI * 2,
    )

    context.stroke()
  }

  context.restore()

  const coreGlow = context.createRadialGradient(
    center.x,
    center.y,
    0,
    center.x,
    center.y,
    150,
  )
  coreGlow.addColorStop(
    0,
    `rgba(0, 214, 230, ${0.04 + convergence * 0.2 + pulse * 0.035})`,
  )
  coreGlow.addColorStop(1, "rgba(0, 214, 230, 0)")
  context.fillStyle = coreGlow
  context.beginPath()
  context.arc(center.x, center.y, 150, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = `rgba(224, 253, 255, ${0.35 + convergence * 0.55})`
  context.beginPath()
  context.arc(center.x, center.y, 3 + pulse * 2, 0, Math.PI * 2)
  context.fill()

  const linkPoints = [
    { x: 498, y: 664 },

    { x: 935, y: 114 },

    { x: 1376, y: 308 },
  ]

  const linkEnds = [
    { x: 368, y: 635 },

    { x: 802, y: 111 },

    { x: 1205, y: 294 },
  ]

  linkPoints.forEach((point, index) => {
    const reveal = ease((progress - 0.24 - index * 0.08) / 0.22)

    context.strokeStyle = `rgba(0, 182, 202, ${reveal * 0.78})`

    context.lineWidth = 1.5

    context.beginPath()

    context.moveTo(point.x, point.y)

    context.lineTo(point.x + (linkEnds[index].x - point.x) * reveal, point.y)

    context.lineTo(
      linkEnds[index].x,

      point.y + (linkEnds[index].y - point.y) * reveal,
    )

    context.stroke()

    context.fillStyle = `rgba(0, 214, 230, ${reveal})`

    context.beginPath()

    context.arc(point.x, point.y, 3 + pulse * reveal * 2, 0, Math.PI * 2)

    context.fill()
  })

  if (convergence > 0) {
    const glow = context.createRadialGradient(
      center.x,
      center.y,
      0,
      center.x,
      center.y,
      260,
    )

    glow.addColorStop(0, `rgba(0, 182, 202, ${convergence * 0.14})`)

    glow.addColorStop(1, "rgba(0, 182, 202, 0)")

    context.fillStyle = glow

    context.fillRect(center.x - 260, center.y - 260, 520, 520)
  }

  context.restore()
}

export default function ScienceScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    const stage = canvas?.closest<HTMLElement>(".science-scroll-stage")

    const scene = canvas?.closest<HTMLElement>(".science-tech-design")

    const context = canvas?.getContext("2d")

    if (!canvas || !stage || !scene || !context) return

    let frame = 0
    let pointer = { x: 0.5, y: 0.5 }

    const labels = [
      ...scene.querySelectorAll<HTMLElement>("[data-science-label]"),
    ]

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const update = () => {
      cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        const stageBounds = stage.getBoundingClientRect()
        const sceneBounds = scene.getBoundingClientRect()
        const scrollDistance = stageBounds.height - sceneBounds.height
        const scale = stageBounds.width / width
        const progress = reducedMotion.matches
          ? 1
          : clamp(scrollDistance > 0 ? -stageBounds.top / scrollDistance : 1)
        const orbitEase = ease((progress - 0.18) / 0.48)
        const spread = Math.sin(progress * Math.PI) * 24
        const pinScene =
          !reducedMotion.matches &&
          stageBounds.top <= 0 &&
          stageBounds.bottom >= sceneBounds.height

        if (pinScene && scale > 0) {
          scene.style.position = "fixed"
          scene.style.top = `${-stageBounds.top / scale}px`
          scene.style.zIndex = "100"
        } else {
          scene.style.position = ""
          scene.style.top = ""
          scene.style.zIndex = ""
        }

        scene.style.setProperty("--scene-progress", `${progress}`)

        scene.style.setProperty(
          "--scene-left-x",
          `${-spread - (pointer.x - 0.5) * 36}px`,
        )

        scene.style.setProperty(
          "--scene-right-x",
          `${spread + (pointer.x - 0.5) * 36}px`,
        )

        scene.style.setProperty(
          "--scene-left-y",
          `${Math.sin(progress * Math.PI * 2) * 15 - (pointer.y - 0.5) * 26}px`,
        )

        scene.style.setProperty(
          "--scene-right-y",
          `${Math.cos(progress * Math.PI * 2) * 15 + (pointer.y - 0.5) * 26}px`,
        )

        scene.style.setProperty("--scene-left-angle", `${progress * 8}deg`)

        scene.style.setProperty("--scene-right-angle", `${progress * -8}deg`)

        scene.style.setProperty(
          "--scene-scale",
          `${0.78 + ease(progress / 0.24) * 0.22}`,
        )

        scene.style.setProperty(
          "--scene-orbit-opacity",
          `${0.2 + orbitEase * 0.8}`,
        )

        labels.forEach((label) => {
          const start = Number(label.dataset.scienceLabel) || 0

          const reveal = ease((progress - start) / 0.16)

          label.style.opacity = `${reveal}`

          label.style.translate = `${(1 - reveal) * (label.dataset.direction === "left" ? -28 : 28)}px ${12 - reveal * 12}px`
        })

        const scrollCue = scene.querySelector<HTMLElement>(
          ".science-scroll-cue",
        )

        if (scrollCue)
          scrollCue.style.opacity = `${1 - ease((progress - 0.04) / 0.24)}`

        drawScene(context, progress, pointer)
      })
    }

    const updatePointer = (event: PointerEvent) => {
      const bounds = scene.getBoundingClientRect()
      pointer = {
        x: clamp((event.clientX - bounds.left) / bounds.width),
        y: clamp((event.clientY - bounds.top) / bounds.height),
      }
      update()
    }

    const resetPointer = () => {
      pointer = { x: 0.5, y: 0.5 }
      update()
    }

    update()

    window.addEventListener("scroll", update, { passive: true })

    window.addEventListener("resize", update)
    scene.addEventListener("pointermove", updatePointer)
    scene.addEventListener("pointerleave", resetPointer)

    return () => {
      cancelAnimationFrame(frame)

      window.removeEventListener("scroll", update)

      window.removeEventListener("resize", update)
      scene.removeEventListener("pointermove", updatePointer)
      scene.removeEventListener("pointerleave", resetPointer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="science-scene-canvas"
      width={width}
      height={height}
      aria-hidden="true"
    />
  )
}
