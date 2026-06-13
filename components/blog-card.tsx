import Link from 'next/link'
import Image from 'next/image'
import { GlassCard } from '@/components/glass-card'
import type { BlogPost } from '@/lib/blog-data'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <GlassCard hover glow className="h-full overflow-hidden">
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            {post.category}
          </span>
          <h3 className="mt-2 font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{post.excerpt}</p>
          <p className="mt-3 text-[10px] text-muted-foreground">{post.readTime} · {post.date}</p>
        </div>
      </GlassCard>
    </Link>
  )
}
