import type { Metadata } from 'next'
import { projects } from '@/lib/data'
import ProjectView from './ProjectView'

const caseStudies = projects.filter(p => p.overview)

export function generateStaticParams() {
  return caseStudies.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = caseStudies.find(x => x.slug === slug)
  if (!p) return { title: 'Project not found | Varun Thallapelly' }
  const title = `${p.title} | Varun Thallapelly`
  return {
    title,
    description: `${p.tagline}. ${p.overview}`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title, description: p.tagline, url: `/projects/${p.slug}`, type: 'article' },
    twitter: { card: 'summary_large_image', title, description: p.tagline },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProjectView slug={slug} />
}
