export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-black/70">{children}</div>
    </section>
  );
}

export default function LegalPage({ title, description, lastUpdated, children }) {
  return (
    <div className="shell py-12">
      <article className="mx-auto max-w-3xl">
        <header className="mb-10">
          <p className="muted-label mb-3">Legal</p>
          <h1 className="text-balance text-4xl font-semibold md:text-5xl">{title}</h1>
          {description ? <p className="mt-4 text-black/65">{description}</p> : null}
          {lastUpdated ? <p className="mt-4 text-sm text-black/45">Last updated: {lastUpdated}</p> : null}
        </header>
        <div className="panel space-y-8 p-8 lg:p-10">{children}</div>
      </article>
    </div>
  );
}
