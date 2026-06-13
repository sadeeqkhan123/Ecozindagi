import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { EzButton } from '@/components/ez-button'
import { getPostBySlug, blogPosts } from '@/lib/blog-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} — Eco Zindagi`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="mesh-bg min-h-screen">
        <article className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Journal
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>By {post.author}</span>
            </div>

            <h1 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>

            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
            </div>

            <GlassCard glow className="mt-8 p-6 sm:p-8">
              <div className="space-y-5 text-sm leading-relaxed text-foreground/90 sm:text-base">
                {post.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </GlassCard>

            <div className="mt-8 flex flex-wrap gap-3">
              <EzButton href="/shop" variant="primary">
                Shop Products
              </EzButton>
              <EzButton href="/contact" variant="ghost">
                Get in Touch
              </EzButton>
            </div>
          </div>
        </article>

        <section className="border-t border-primary/10 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-5 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              More Stories
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <GlassCard hover className="h-full p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {p.category}
                    </span>
                    <h3 className="mt-2 font-heading text-sm font-bold text-foreground">{p.title}</h3>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
