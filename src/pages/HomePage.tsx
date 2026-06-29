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
const enabledFeatures = [
  {
    label: "📝 Create rich notes",
    description:
      "Create notes with titles, descriptions, URLs, images, and tags.",
  },
  {
    label: "🏷️ Tag without limits",
    description:
      "Add as many tags as you wish to any single note, so one idea can live in every context where it belongs.",
  },
  {
    label: "🎯 Follow your current focus",
    description:
      "Bring up notes with the specific tags you are interested in right now.",
  },
  {
    label: "⚙️ Search with precision",
    description:
      "Deeply search your archive with precise queries, like all untagged notes from a specific period, or tagged notes with images that have fewer than 5 views.",
  },
  {
    label: "📱 Browse results naturally",
    description:
      "Scroll or swipe through your search results like a social media feed or dating app depending on your mood.",
  },
  {
    label: "✏️ Keep tags flexible",
    description:
      "Rename or modify any tag after it has been assigned to your notes. The smart tagging system lets you change any part of a tag without unlinking it from the notes it is linked to.",
  },
  {
    label: "☁️ Sync across devices",
    description:
      "Sync all Foxling data across your mobile devices. A way to create notes on the web is coming soon via Telegram bot, if enough users agree.",
  },
  {
    label: "🔐 Fully encrypt synced notes",
    description:
      "Protect synced notes with one of the safest types of encryption on the internet: a master password that only you hold, with encryption and decryption happening on your device.",
  },
  {
    label: "🧭 Find untagged notes",
    description:
      "See what still needs organizing by filtering for notes without tags.",
  },
  {
    label: "🔎 Rediscover quiet notes",
    description:
      "Surface notes you have viewed infrequently, with Foxling tracking how many times each note has been opened by you.",
  },
];
const audienceMatches = [
  {
    label: "You save links for later",
    description:
      "If you often send yourself a link and forget to look at it later, but wish you didn't.",
  },
  {
    label: "You think in tag combinations",
    description:
      "If you want to easily find notes that all have a certain combination of tags, like food and Paris, or fun activities and summer.",
  },
  {
    label: "You remember through visuals",
    description:
      "If you want to categorize your knowledge using powerful tagging cues: colors, icons, and images.",
  },
  {
    label: "You want a say in the tool",
    description:
      "If you want to influence what Foxling looks like and be involved in a community that cares about efficiently interacting with their knowledge.",
    note: "Discord launching soon",
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
    document.title = "Foxling: beautiful notes app with tag system";
    upsertMeta(
      "description",
      "Foxling is a new way to store and retrieve your notes, thoughts, ideas, and bookmarks.",
    );
    upsertCanonical(canonicalUrl);
  }, []);

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setHeroWordIndex(
        (currentIndex) => (currentIndex + 1) % rotatingHeroWords.length,
      );
    }, 1800);

    return () => window.clearInterval(rotationTimer);
  }, []);

  useEffect(() => {
    const slideshowTimer = window.setInterval(() => {
      setScreenshotIndex(
        (currentIndex) => (currentIndex + 1) % heroScreenshots.length,
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
          <p className="mt-6 max-w-2xl text-2xl leading-8 text-foreground/85">
            Foxling exists to make you <strong>hyped</strong> about saving and
            exploring your knowledge.
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
              className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-special focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/foxling.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-special focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
      <section className="mx-auto w-full max-w-6xl py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-normal sm:text-5xl">
              <span className="text-special">Foxling</span> is for you if
            </h2>
          </div>

          <ol className="border-y border-border">
            {audienceMatches.map((match, index) => (
              <li
                key={match.label}
                className="grid gap-4 border-border py-6 first:border-t-0 sm:grid-cols-[3rem_1fr] [&+li]:border-t"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-special/55 bg-special/10 text-sm font-bold text-special"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {match.label}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-7 text-foreground/75">
                    {match.description}
                  </p>
                  {"note" in match ? (
                    <button
                      type="button"
                      className="mt-4 inline-flex cursor-default items-center rounded-full border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground shadow-sm"
                      aria-disabled="true"
                    >
                      {match.note}
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl py-16 sm:py-20">
        <article className="rounded-lg border border-border bg-muted/60 p-6 sm:p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold leading-tight tracking-normal sm:text-5xl">
              Hi, I'm Ari
            </h2>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
              This is an app that was born out of my frustration of never being
              able to efficiently retrieve information I had saved online
              (bookmarks, saved messages, notes apps, etc.). My goal is to help
              out other people that have had the same problem and to make
              Foxling insanely practical and fun to use for as many people as
              possible.
            </p>
          </div>
        </article>
      </section>
      <section className="mx-auto w-full max-w-6xl py-20 sm:py-24">
        <div>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-normal sm:text-5xl">
            What <span className="text-special">Foxling</span> enables you to do
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/80">
            Foxling helps you capture, organize, search, sync, and protect your
            personal archive.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {enabledFeatures.map((achievement) => (
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
      </section>
    </main>
  );
}
