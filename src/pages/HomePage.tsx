import { useEffect, useState } from "react";

const canonicalUrl = "https://foxlingapp.com/";
const rotatingHeroWords = ["notes", "thoughts", "ideas", "bookmarks"];
const heroScreenshots = [
  {
    src: "/screenshots/search-screen.png",
    alt: "Foxling search screen",
  },
  {
    src: "/screenshots/search-header.png",
    alt: "Foxling search filters",
  },
  {
    src: "/screenshots/search-taglist.png",
    alt: "Foxling tag list search",
  },
];
const searchAchievements = [
  {
    label: "Rediscover quiet notes",
    description:
      "Surface notes you have viewed infrequently, with Foxling tracking how many times each note has been opened by you.",
  },
  {
    label: "Find untagged notes",
    description:
      "See what still needs organizing by filtering for notes without tags.",
  },
  {
    label: "Follow your current focus",
    description:
      "Bring up notes with the specific tags you are interested in right now.",
  },
];

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
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  useEffect(() => {
    document.title = "Foxling";
    upsertMeta(
      "description",
      "Foxling is a new way to store and retrieve your notes, thoughts, ideas, and bookmarks.",
    );
    upsertCanonical(canonicalUrl);
  }, []);

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setHeroWordIndex((currentIndex) =>
        (currentIndex + 1) % rotatingHeroWords.length,
      );
    }, 1800);

    return () => window.clearInterval(rotationTimer);
  }, []);

  useEffect(() => {
    const slideshowTimer = window.setInterval(() => {
      setScreenshotIndex((currentIndex) =>
        (currentIndex + 1) % heroScreenshots.length,
      );
    }, 3200);

    return () => window.clearInterval(slideshowTimer);
  }, []);

  return (
    <main className="bg-background px-5 py-12 text-foreground sm:px-6 sm:py-18">
      <section className="mx-auto grid min-h-[70vh] w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-center">
        <div className="flex flex-col justify-center">
          <h1
            className="text-5xl font-bold leading-tight tracking-normal sm:text-7xl"
            aria-label="A new way to store and retrieve your notes, thoughts, ideas, and bookmarks"
          >
            A new way to store and retrieve your{" "}
            <span
              aria-hidden="true"
              className="inline-grid align-baseline text-special"
            >
              {rotatingHeroWords.map((word, index) => (
                <span
                  key={word}
                  className={`col-start-1 row-start-1 transition-opacity duration-500 ease-in-out ${
                    index === heroWordIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/85">
            Foxling gives your personal knowledge a place to land and a way to
            come back when you need it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex cursor-default items-center rounded-full border border-border bg-muted px-5 py-3 text-sm font-semibold text-foreground shadow-sm"
              aria-disabled="true"
            >
              Launching soon
            </button>
            <a
              href="https://x.com/ariupgrade"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-special focus:ring-offset-2 focus:ring-offset-background"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/foxling.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-special focus:ring-offset-2 focus:ring-offset-background"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[22rem] lg:mr-0">
          <div className="relative aspect-[1472/3111] overflow-hidden">
            {heroScreenshots.map((screenshot, index) => (
              <img
                key={screenshot.src}
                src={screenshot.src}
                alt={screenshot.alt}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === screenshotIndex ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={index !== screenshotIndex}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-normal sm:text-5xl">
              What Foxling lets you achieve
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/80">
              Foxling has an all-encompassing Search section that lets you dive
              into your personal archive.
            </p>
          </div>

          <div className="space-y-3">
            {searchAchievements.map((achievement) => (
              <article
                key={achievement.label}
                className="rounded-lg border border-border bg-muted/60 p-5"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {achievement.label}
                </h3>
                <p className="mt-2 leading-7 text-foreground/75">
                  {achievement.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-3xl border-l-2 border-special pl-4 text-sm leading-6 text-foreground/70">
          <span className="font-semibold text-special">Tip:</span> You can
          name, save, and optionally sync any search query that you want to keep
          revisiting.
        </p>
      </section>
    </main>
  );
}
