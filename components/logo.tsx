import Image from 'next/image'
import Link from 'next/link'

const sizes = {
  sm: { height: 40, width: 160 },
  md: { height: 48, width: 190 },
  lg: { height: 60, width: 240 },
} as const

interface LogoProps {
  className?: string
  size?: keyof typeof sizes
  link?: boolean
}

export function Logo({ className = '', size = 'md', link = true }: LogoProps) {
  const { height, width } = sizes[size]

  const image = (
    <Image
      src="/eco-zindagi-logo.png"
      alt="Eco Zindagi"
      width={width}
      height={height}
      className={`h-auto w-auto object-contain ${className}`}
      style={{ maxHeight: height }}
      priority
    />
  )

  if (!link) return image

  return (
    <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-90">
      {image}
    </Link>
  )
}
