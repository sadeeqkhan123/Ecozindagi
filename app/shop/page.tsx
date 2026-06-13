'use client'

import { Suspense, useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { products, getAllCategories } from '@/lib/product-data'
import { useSearchParams } from 'next/navigation'
import { useCurrency } from '@/lib/currency-context'

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen mesh-bg" />}>
      <ShopContent />
    </Suspense>
  )
}

function ShopContent() {
  const searchParams = useSearchParams()
  const { formatPrice } = useCurrency()
  const initialCategory = searchParams.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('featured')
  const maxPkr = 500000
  const [priceRange, setPriceRange] = useState([0, maxPkr])

  const categories = ['all', ...getAllCategories()]

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'eco-score':
        result.sort((a, b) => b.ecoScore - a.ecoScore)
        break
      default:
        break
    }

    return result
  }, [selectedCategory, sortBy, priceRange])

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/50 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2 sm:text-4xl">Our Shop</h1>
            <p className="text-muted-foreground">
              Discover our curated collection of sustainable, high-quality products
            </p>
          </div>
        </section>

        {/* Shop Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Sidebar Filters — stacks above products on mobile/tablet */}
              <div className="lg:col-span-1">
                <div className="space-y-8 lg:sticky lg:top-24">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Category</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="category"
                            value={cat}
                            checked={selectedCategory === cat}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors capitalize">
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max={maxPkr}
                        step="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="eco-score">Highest Impact Score</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">
                    Showing {filteredAndSortedProducts.length} products
                  </p>
                </div>

                {filteredAndSortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                    {filteredAndSortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">
                      No products found with the current filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
