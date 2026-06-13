'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { EzButton } from '@/components/ez-button'
import { BlogCard } from '@/components/blog-card'
import { blogPosts, getFeaturedPosts } from '@/lib/blog-data'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogPage() {
  const featured = getFeaturedPosts()
  const rest = blogPosts.filter((p) => !p.featured)

  return (
    <>
      <Navbar />
      <main className="mesh-bg min-h-screen">
        <section className="relative overflow-hidden border-b border-white/40 px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Eco Zindagi Journal
            </p>
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              20 Guides for a Greener Pakistan
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Product deep-dives, zero-waste guides, partnership playbooks, and startup updates from our team.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-5 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              Featured
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <GlassCard hover glow className="h-full overflow-hidden">
                      <div className="relative h-44 w-full">
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="50vw" />
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">{post.category}</span>
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary">{post.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-5 font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              All {blogPosts.length} Articles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 6) * 0.05 }}
                  viewport={{ once: true }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>

            <GlassCard className="mt-8 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Want society or city partnership guides? Visit our partnerships page.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <EzButton href="/partnerships" variant="link">Partnerships</EzButton>
                <EzButton href="/contact" variant="ghost">Contact Us</EzButton>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
