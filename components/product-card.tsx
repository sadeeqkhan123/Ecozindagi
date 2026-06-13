'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/product-data'
import { useCurrency } from '@/lib/currency-context'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/glass-card'

interface ProductCardProps {
  product: Product
  showAddToCart?: boolean
  compact?: boolean
  glass?: boolean
}

export function ProductCard({ product, showAddToCart = true, compact = false, glass = false }: ProductCardProps) {
  const { addToCart } = useCart()
  const { formatPrice } = useCurrency()
  const [isAdding, setIsAdding] = useState(false)
  const [showAddedMessage, setShowAddedMessage] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addToCart(product, 1)
    setShowAddedMessage(true)
    setTimeout(() => {
      setIsAdding(false)
      setShowAddedMessage(false)
    }, 1500)
  }

  const inner = (
    <>
      <div className={cn(
        'relative flex-shrink-0 overflow-hidden',
        compact ? 'h-44 sm:h-48' : 'h-72',
        glass ? 'bg-white/80' : 'bg-white'
      )}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            'transition-transform duration-500 group-hover:scale-105',
            'object-contain p-4'
          )}
        />
      </div>

      <div className={cn('flex flex-grow flex-col', compact ? 'space-y-2 p-3' : 'space-y-4 p-5')}>
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
            {product.category}
          </p>
          <h3 className={cn(
            'font-heading font-bold leading-tight text-foreground transition-colors group-hover:text-primary',
            compact ? 'text-sm' : 'text-lg'
          )}>
            {product.name}
          </h3>
        </div>

        {!compact && (
          <p className="line-clamp-2 flex-grow text-sm text-muted-foreground">{product.description}</p>
        )}

        <div className={cn('border-t border-border/50', compact ? 'pt-2' : 'pt-3')}>
          <p className={cn('font-bold text-foreground', compact ? 'text-base' : 'text-xl')}>
            {formatPrice(product.price)}
          </p>
          {!compact && (
            <p className="mt-1 text-xs text-muted-foreground">Eco Score {product.ecoScore}%</p>
          )}
        </div>

        {showAddToCart && !compact && (
          <motion.button
            onClick={handleAddToCart}
            disabled={isAdding}
            whileTap={{ scale: 0.98 }}
            className="mt-1 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-75"
          >
            {showAddedMessage ? 'Added ✓' : isAdding ? 'Adding...' : 'Add to Cart'}
          </motion.button>
        )}
      </div>
    </>
  )

  return (
    <Link href={`/shop/${product.slug}`} className="group block h-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: '-20px' }}
        className="h-full"
      >
        {glass ? (
          <GlassCard hover glow className="flex h-full flex-col overflow-hidden">
            {inner}
          </GlassCard>
        ) : (
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-white/65 to-white/35 shadow-lg shadow-primary/8 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/15">
            {inner}
          </div>
        )}
      </motion.div>
    </Link>
  )
}
