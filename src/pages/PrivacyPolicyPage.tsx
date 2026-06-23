import { useEffect, useState } from "react";

const canonicalUrl = "https://foxlingapp.com/privacy-policy";
const themeStorageKey = "foxling-theme";
type Theme = "light" | "dark";
const themeBackgrounds: Record<Theme, string> = {
  dark: "#241a14",
  light: "#f8f9fa",
};

function getBrowserTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

const sections = [
  {
    title: "Information We Collect",
    body: (
      <>
        <p>Foxling may collect the following information:</p>
        <ul>
          <li>
            <strong>Personal information:</strong> name, email address, and user
            ID.
          </li>
          <li>
            <strong>Account information:</strong> information needed to create,
            manage, and personalize your account.
          </li>
          <li>
            <strong>Purchase information:</strong> purchase history related to
            subscriptions or in-app purchases.
          </li>
          <li>
            <strong>Photos:</strong> photos you choose to upload or attach in
            the app. Photo upload is optional.
          </li>
          <li>
            <strong>App activity:</strong> app interactions and usage events.
          </li>
          <li>
            <strong>App performance information:</strong> crash logs,
            diagnostics, and other app performance data.
          </li>
          <li>
            <strong>Device or other IDs:</strong> device identifiers or similar
            IDs used for app functionality, security, fraud prevention,
            compliance, and account management.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Information",
    body: (
      <>
        <p>We use collected information to:</p>
        <ul>
          <li>Provide and maintain Foxling's app features.</li>
          <li>Create and manage user accounts.</li>
          <li>Personalize your app experience.</li>
          <li>Process and verify purchases or subscriptions.</li>
          <li>Let you upload and manage optional photos.</li>
          <li>Understand app usage and improve the product.</li>
          <li>Diagnose bugs, crashes, and performance issues.</li>
          <li>Protect the app from fraud, abuse, or security risks.</li>
          <li>Comply with legal and platform requirements.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Sharing",
    body: (
      <>
        <p>We do not sell your personal information.</p>
        <p>
          We do not share user data with third parties for advertising or
          independent third-party use. We may use trusted service providers to
          operate the app, process purchases, provide analytics, store data, or
          diagnose crashes. These providers process information only on our
          behalf and only as needed to provide their services.
        </p>
        <p>
          We may also disclose information if required by law, regulation, legal
          process, or to protect the rights, safety, and security of Foxling,
          our users, or others.
        </p>
      </>
    ),
  },
  {
    title: "Photos and Optional Uploads",
    body: (
      <p>
        If you choose to upload photos, Foxling collects and stores those photos
        only to provide the app features you request. You are not required to
        upload photos to use the app unless a specific feature depends on them.
      </p>
    ),
  },
  {
    title: "Data Security",
    body: (
      <p>
        We use reasonable technical and organizational safeguards to protect
        your information. Data is transmitted over secure connections using
        encryption in transit.
      </p>
    ),
  },
  {
    title: "Data Retention and Deletion",
    body: (
      <>
        <p>
          We keep information only for as long as needed to provide Foxling,
          comply with legal obligations, resolve disputes, prevent fraud or
          abuse, and enforce our agreements.
        </p>
        <p>
          You can request deletion of your account and associated data here:
        </p>
        <p>
          <a href="https://forms.gle/ADAbNTFuNndtmgMp9">
            https://forms.gle/ADAbNTFuNndtmgMp9
          </a>
        </p>
        <p>
          You can also request deletion of certain app data without deleting
          your entire account using the same form:
        </p>
        <p>
          <a href="https://forms.gle/ADAbNTFuNndtmgMp9">
            https://forms.gle/ADAbNTFuNndtmgMp9
          </a>
        </p>
        <p>
          Some information may be retained where required for legal, security,
          fraud prevention, tax, accounting, or compliance purposes.
        </p>
      </>
    ),
  },
  {
    title: "Your Choices",
    body: (
      <>
        <p>You may:</p>
        <ul>
          <li>
            Access, update, or delete certain account information in the app
            where available.
          </li>
          <li>
            Request account deletion or data deletion using the deletion form
            above.
          </li>
          <li>Choose whether to upload photos.</li>
          <li>Disable certain permissions through your device settings.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. If we make material
        changes, we will update the "Last updated" date and may provide
        additional notice in the app or through other reasonable means.
      </p>
    ),
  },
  {
    title: "Contact Us",
    body: (
      <>
        <p>
          If you have questions about this Privacy Policy or Foxling's data
          practices, contact us at:
        </p>
        <p>
          <a href="mailto:contact@foxlingapp.com">contact@foxlingapp.com</a>
        </p>
      </>
    ),
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

export function PrivacyPolicyPage() {
  const [theme, setTheme] = useState<Theme>(getBrowserTheme);

  useEffect(() => {
    document.title = "Privacy Policy | Foxling";
    upsertMeta(
      "description",
      "Foxling Privacy Policy explaining how information is collected, used, stored, and protected.",
    );
    upsertCanonical(canonicalUrl);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.backgroundColor = themeBackgrounds[theme];
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-6 sm:py-18">
      <button
        type="button"
        className="fixed right-4 top-4 rounded-full border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-special focus:ring-offset-2 focus:ring-offset-background"
        onClick={() => setTheme(nextTheme)}
        aria-label={`Switch to ${nextTheme} mode`}
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>
      <article className="mx-auto w-full max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-special">
          Foxling
        </p>
        <h1 className="text-5xl font-bold leading-none tracking-normal sm:text-7xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Last updated: June 23, 2026
        </p>
        <div className="mt-10 space-y-8 text-lg leading-8 text-foreground/85 sm:mt-14">
          <p>
            Foxling ("we," "our," or "us") operates the Foxling mobile app. This
            Privacy Policy explains how Foxling collects, uses, stores, and
            protects information when you use the app.
          </p>
          {sections.map((section) => (
            <section
              key={section.title}
              className="space-y-4 [&_a]:font-medium [&_a]:text-special [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
            >
              <h2 className="text-2xl font-bold leading-tight text-foreground">
                {section.title}
              </h2>
              {section.body}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
