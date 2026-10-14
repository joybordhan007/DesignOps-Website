import { useEffect, useRef, useState } from "react"

type CountUpProps = {
  value: number

  prefix?: string

  suffix?: string

  useGrouping?: boolean
}

export default function CountUp({
  value,

  prefix = "",

  suffix = "",

  useGrouping = true,
}: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    let frame = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        observer.disconnect()

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCount(value)

          return
        }

        const duration = 1600

        const start = performance.now()

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)

          const eased = 1 - (1 - progress) ** 4

          setCount(Math.round(value * eased))

          if (progress < 1) frame = requestAnimationFrame(animate)
        }

        frame = requestAnimationFrame(animate)
      },

      { threshold: 0.35 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()

      cancelAnimationFrame(frame)
    }
  }, [value])

  const numberFormat = new Intl.NumberFormat("en-US", { useGrouping })

  const formattedCount = numberFormat.format(count)

  return (
    <span
      ref={elementRef}
      aria-label={`${prefix}${numberFormat.format(value)}${suffix}`}
    >
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}
