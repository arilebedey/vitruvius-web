import { useEffect, useState } from "react";

const canonicalUrl = "https://foxlingapp.com/privacy-policy";
const themeStorageKey = "foxling-theme";
const lastUpdated = "June 27, 2026";
type Theme = "light" | "dark";
type CopyStatus = "idle" | "copied" | "failed";
const themeBackgrounds: Record<Theme, string> = {
  dark: "#1b1e1f",
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
          <li>
            <strong>Master password:</strong> if you choose to enable optional
            data encryption, you enter a master password for that feature. We
            do not store your master password on our servers. The app may store
            it locally on your device to help keep sync unlocked.
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
          <li>
            Provide optional data encryption features when you choose to use
            them.
          </li>
          <li>Comply with legal and platform requirements.</li>
        </ul>
        <p>
          If you enable optional data encryption, your master password is used
          to encrypt or decrypt covered data for that feature. Because we do not
          store your master password on our servers, we cannot use it to recover
          or decrypt that data for you.
        </p>
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
        <p>
          Because we do not store your master password on our servers, we do not
          provide it to service providers or other third parties. Service
          providers may store or process encrypted data on our behalf where
          needed to operate the app.
        </p>
      </>
    ),
  },
  {
    title: "Photos and Optional Uploads",
    body: (
      <>
        <p>
          If you choose to upload photos, Foxling collects and stores those
          photos only to provide the app features you request. You are not
          required to upload photos to use the app unless a specific feature
          depends on them.
        </p>
        <p>
          Where optional data encryption applies to photos or other uploaded
          content, that content may be stored in encrypted form. We do not store
          the master password used for optional encryption on our servers.
        </p>
      </>
    ),
  },
  {
    title: "Data Security",
    body: (
      <>
        <p>
          We use reasonable technical and organizational safeguards to protect
          your information. Data is transmitted over secure connections using
          encryption in transit.
        </p>
        <p>
          Foxling may optionally offer additional data encryption using a master
          password that you provide. We do not store your master password on our
          servers, so we cannot recover it for you if it is lost.
        </p>
        <p>
          If you lose your master password, encrypted data protected by that
          password may be inaccessible because Foxling cannot reset or retrieve
          the password for you.
        </p>
      </>
    ),
  },
  {
    title: "Full User Encryption",
    body: (
      <>
        <p>
          If you choose master-password encryption, Foxling encrypts synced
          record payloads and uploaded media before they are sent to our
          servers. Your master password is used to unlock encryption keys on
          your device. We do not store your master password on our servers.
        </p>
        <p>The encrypted synced data includes:</p>
        <ul>
          <li>
            <strong>Entry content:</strong> entry titles, body text, view
            counts, and points.
          </li>
          <li>
            <strong>Tag and organization content:</strong> category, label,
            choice label, and choice option titles; colors; order; and icon or
            visual settings.
          </li>
          <li>
            <strong>Saved links:</strong> link titles, URLs, and link order.
          </li>
          <li>
            <strong>Saved searches:</strong> saved search names and filter
            details.
          </li>
          <li>
            <strong>Uploaded media:</strong> entry photos and tag images,
            including custom images used for categories, labels, choice labels,
            and choice options.
          </li>
        </ul>
        <p>
          Some sync metadata is not encrypted because it is needed to operate
          sync, resolve conflicts, upload or download media, and manage
          deletion. This can include record type, record IDs, parent record
          references, tag relationship IDs, creation and modification dates,
          deletion or trash status, media object keys, file type, file size,
          checksums, and upload time.
        </p>
      </>
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
        <p>
          Encrypted data is subject to the same retention and deletion practices
          described above. Deleting encrypted data removes the encrypted data we
          store, but losing your master password does not by itself delete your
          account or stored data.
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
          <li>
            Choose whether to enable optional data encryption where available.
          </li>
          <li>Disable certain permissions through your device settings.</li>
        </ul>
        <p>
          You are responsible for keeping your master password safe if you use
          optional data encryption. Foxling cannot retrieve or reset a master
          password that is not stored on our servers.
        </p>
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

const privacyPolicyMarkdown = [
  "# Privacy Policy",
  "",
  "Foxling",
  "",
  `Last updated: ${lastUpdated}`,
  "",
  'Foxling ("we," "our," or "us") operates the Foxling mobile app. This Privacy Policy explains how Foxling collects, uses, stores, and protects information when you use the app, including optional data encryption using a user-provided master password.',
  "",
  "## Information We Collect",
  "",
  "Foxling may collect the following information:",
  "",
  "- **Personal information:** name, email address, and user ID.",
  "- **Account information:** information needed to create, manage, and personalize your account.",
  "- **Purchase information:** purchase history related to subscriptions or in-app purchases.",
  "- **Photos:** photos you choose to upload or attach in the app. Photo upload is optional.",
  "- **App activity:** app interactions and usage events.",
  "- **App performance information:** crash logs, diagnostics, and other app performance data.",
  "- **Device or other IDs:** device identifiers or similar IDs used for app functionality, security, fraud prevention, compliance, and account management.",
  "- **Master password:** if you choose to enable optional data encryption, you enter a master password for that feature. We do not store your master password on our servers. The app may store it locally on your device to help keep sync unlocked.",
  "",
  "## How We Use Information",
  "",
  "We use collected information to:",
  "",
  "- Provide and maintain Foxling's app features.",
  "- Create and manage user accounts.",
  "- Personalize your app experience.",
  "- Process and verify purchases or subscriptions.",
  "- Let you upload and manage optional photos.",
  "- Understand app usage and improve the product.",
  "- Diagnose bugs, crashes, and performance issues.",
  "- Protect the app from fraud, abuse, or security risks.",
  "- Provide optional data encryption features when you choose to use them.",
  "- Comply with legal and platform requirements.",
  "",
  "If you enable optional data encryption, your master password is used to encrypt or decrypt covered data for that feature. Because we do not store your master password on our servers, we cannot use it to recover or decrypt that data for you.",
  "",
  "## Data Sharing",
  "",
  "We do not sell your personal information.",
  "",
  "We do not share user data with third parties for advertising or independent third-party use. We may use trusted service providers to operate the app, process purchases, provide analytics, store data, or diagnose crashes. These providers process information only on our behalf and only as needed to provide their services.",
  "",
  "We may also disclose information if required by law, regulation, legal process, or to protect the rights, safety, and security of Foxling, our users, or others.",
  "",
  "Because we do not store your master password on our servers, we do not provide it to service providers or other third parties. Service providers may store or process encrypted data on our behalf where needed to operate the app.",
  "",
  "## Photos and Optional Uploads",
  "",
  "If you choose to upload photos, Foxling collects and stores those photos only to provide the app features you request. You are not required to upload photos to use the app unless a specific feature depends on them.",
  "",
  "Where optional data encryption applies to photos or other uploaded content, that content may be stored in encrypted form. We do not store the master password used for optional encryption on our servers.",
  "",
  "## Data Security",
  "",
  "We use reasonable technical and organizational safeguards to protect your information. Data is transmitted over secure connections using encryption in transit.",
  "",
  "Foxling may optionally offer additional data encryption using a master password that you provide. We do not store your master password on our servers, so we cannot recover it for you if it is lost.",
  "",
  "If you lose your master password, encrypted data protected by that password may be inaccessible because Foxling cannot reset or retrieve the password for you.",
  "",
  "## Full User Encryption",
  "",
  "If you choose master-password encryption, Foxling encrypts synced record payloads and uploaded media before they are sent to our servers. Your master password is used to unlock encryption keys on your device. We do not store your master password on our servers.",
  "",
  "The encrypted synced data includes:",
  "",
  "- **Entry content:** entry titles, body text, view counts, and points.",
  "- **Tag and organization content:** category, label, choice label, and choice option titles; colors; order; and icon or visual settings.",
  "- **Saved links:** link titles, URLs, and link order.",
  "- **Saved searches:** saved search names and filter details.",
  "- **Uploaded media:** entry photos and tag images, including custom images used for categories, labels, choice labels, and choice options.",
  "",
  "Some sync metadata is not encrypted because it is needed to operate sync, resolve conflicts, upload or download media, and manage deletion. This can include record type, record IDs, parent record references, tag relationship IDs, creation and modification dates, deletion or trash status, media object keys, file type, file size, checksums, and upload time.",
  "",
  "## Data Retention and Deletion",
  "",
  "We keep information only for as long as needed to provide Foxling, comply with legal obligations, resolve disputes, prevent fraud or abuse, and enforce our agreements.",
  "",
  "You can request deletion of your account and associated data here:",
  "",
  "https://forms.gle/ADAbNTFuNndtmgMp9",
  "",
  "You can also request deletion of certain app data without deleting your entire account using the same form:",
  "",
  "https://forms.gle/ADAbNTFuNndtmgMp9",
  "",
  "Some information may be retained where required for legal, security, fraud prevention, tax, accounting, or compliance purposes.",
  "",
  "Encrypted data is subject to the same retention and deletion practices described above. Deleting encrypted data removes the encrypted data we store, but losing your master password does not by itself delete your account or stored data.",
  "",
  "## Your Choices",
  "",
  "You may:",
  "",
  "- Access, update, or delete certain account information in the app where available.",
  "- Request account deletion or data deletion using the deletion form above.",
  "- Choose whether to upload photos.",
  "- Choose whether to enable optional data encryption where available.",
  "- Disable certain permissions through your device settings.",
  "",
  "You are responsible for keeping your master password safe if you use optional data encryption. Foxling cannot retrieve or reset a master password that is not stored on our servers.",
  "",
  "## Changes to This Policy",
  "",
  'We may update this Privacy Policy from time to time. If we make material changes, we will update the "Last updated" date and may provide additional notice in the app or through other reasonable means.',
  "",
  "## Contact Us",
  "",
  "If you have questions about this Privacy Policy or Foxling's data practices, contact us at:",
  "",
  "contact@foxlingapp.com",
  "",
].join("\n");

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand("copy");
    if (!copied) {
      throw new Error("Copy command was rejected");
    }
  } finally {
    document.body.removeChild(textarea);
  }
}

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
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    document.title = "Privacy Policy | Foxling";
    upsertMeta(
      "description",
      "Foxling Privacy Policy explaining how information is collected, used, stored, protected, and optionally encrypted.",
    );
    upsertCanonical(canonicalUrl);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.backgroundColor = themeBackgrounds[theme];
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const nextTheme = theme === "light" ? "dark" : "light";
  const copyButtonText =
    copyStatus === "copied"
      ? "Copied"
      : copyStatus === "failed"
        ? "Copy failed"
        : "Copy .md";

  const handleCopyMarkdown = async () => {
    try {
      await copyTextToClipboard(privacyPolicyMarkdown);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    window.setTimeout(() => setCopyStatus("idle"), 2000);
  };

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-6 sm:py-18">
      <div className="fixed right-4 top-4 z-10">
        <button
          type="button"
          className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-special focus:ring-offset-2 focus:ring-offset-background"
          onClick={() => setTheme(nextTheme)}
          aria-label={`Switch to ${nextTheme} mode`}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
      <article className="mx-auto w-full max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-special">
          Foxling
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-5">
          <h1 className="text-5xl font-bold leading-none tracking-normal sm:text-7xl">
            Privacy Policy
          </h1>
          <button
            type="button"
            className="mt-1 h-10 rounded-md border border-border bg-muted px-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-special focus:ring-offset-2 focus:ring-offset-background sm:mt-2"
            onClick={handleCopyMarkdown}
            aria-live="polite"
          >
            {copyButtonText}
          </button>
        </div>
        <p className="mt-6 text-base text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
        <div className="mt-10 space-y-8 text-lg leading-8 text-foreground/85 sm:mt-14">
          <p>
            Foxling ("we," "our," or "us") operates the Foxling mobile app. This
            Privacy Policy explains how Foxling collects, uses, stores, and
            protects information when you use the app, including optional data
            encryption using a user-provided master password.
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
