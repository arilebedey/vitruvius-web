import { Link } from "react-router-dom";
import { useEffect } from "react";

const canonicalUrl = "https://foxlingapp.com/";

function upsertMeta(name: string, content: string) {
  const selector = `meta[name="${name}"]`;
  const existingMeta = document.head.querySelector<HTMLMetaElement>(selector);

  if (existingMeta) {
    existingMeta.content = content;
    return;
  }

  const meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
}

function upsertCanonical(href: string) {
  const existingLink = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (existingLink) {
    existingLink.href = href;
    return;
  }

  const link = document.createElement("link");
  link.rel = "canonical";
  link.href = href;
  document.head.appendChild(link);
}

export function HomePage() {
  useEffect(() => {
    document.title = "Foxling";
    upsertMeta(
      "description",
      "Foxling public web home for app information and policies.",
    );
    upsertCanonical(canonicalUrl);
  }, []);

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-6 sm:py-18">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-special">
          Foxling
        </p>
        <h1 className="text-5xl font-bold leading-none tracking-normal sm:text-7xl">
          Foxling
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/85">
          A public home for Foxling is on the way. For now, the app privacy
          policy is available here.
        </p>
        <div className="mt-10">
          <Link
            to="/privacy-policy"
            className="inline-flex items-center rounded-full border border-border bg-muted px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-special focus:ring-offset-2 focus:ring-offset-background"
          >
            Privacy Policy
          </Link>
        </div>
      </section>
    </main>
  );
}
