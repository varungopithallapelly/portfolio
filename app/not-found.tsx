import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent-ink">Error 404</p>
        <h1 className="mt-3 font-display text-[clamp(56px,12vw,140px)] font-extrabold leading-none tracking-[-0.04em] text-ink">
          Lost<span className="text-accent">.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[40ch] text-[17px] text-muted">This page doesn&apos;t exist, but plenty of shipped work does.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Go home</Link>
          <Link href="/#projects" className="btn btn-ghost">See projects</Link>
        </div>
      </div>
    </main>
  )
}
