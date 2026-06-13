'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCurrency } from '@/lib/currency-context'
import { whatsappUrl } from '@/lib/contact'
import { submitOrder } from '@/lib/api'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
  const { formatPrice, currency } = useCurrency()
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) return
    
    const itemsText = items
      .map((item) => `${item.product.name} (x${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`)
      .join('\n')
    
    const message = `Hello Eco Zindagi! I'd like to order:\n\n${itemsText}\n\nTotal: ${formatPrice(cartTotal)} (${currency})\n\nPlease confirm availability and delivery.`

    try {
      await submitOrder({
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        })),
        total: cartTotal,
      })
    } catch {
      // continue to WhatsApp
    }

    window.open(whatsappUrl(message), '_blank')
    setShowCheckoutMessage(true)
    setTimeout(() => setShowCheckoutMessage(false), 3000)
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto opacity-50">
              <svg fill="currentColor" viewBox="0 0 24 24" className="text-foreground">
                <path d="M7 4V3c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v1h4c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1h3zm0 2h10V4H7v2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-6">
                Discover our collection of sustainable products
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4 bg-card rounded-lg border border-border p-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0 sm:flex-row"
                  >
                    {/* Product Image */}
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-24">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:gap-4">
                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-base font-semibold text-foreground transition-colors hover:text-primary sm:text-lg"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {item.product.description}
                      </p>
                      <p className="mt-2 text-xl font-bold text-foreground sm:hidden">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end sm:justify-between">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-sm text-muted-foreground transition-colors hover:text-destructive"
                      >
                        Remove
                      </button>

                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1 transition-colors hover:bg-muted"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 transition-colors hover:bg-muted"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-bold text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-muted/50 rounded-lg border border-border p-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <span>Shipping:</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-xl font-bold text-foreground">
                  <span>Total:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Message */}
              {showCheckoutMessage && (
                <div className="bg-primary/10 border border-primary/20 text-primary rounded-lg p-4">
                  WhatsApp window opened. Your cart details have been shared.
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all active:scale-95"
                >
                  Proceed to Checkout (WhatsApp)
                </button>
                <button
                  onClick={() => {
                    clearCart()
                  }}
                  className="flex-1 border border-border text-foreground py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mt-4"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
