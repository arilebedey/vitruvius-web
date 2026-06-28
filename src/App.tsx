import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { HomePage } from "@/pages/HomePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";

const themeStorageKey = "foxling-theme";

type Theme = "light" | "dark";

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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

export function App() {
  const [theme, setTheme] = useState<Theme>(getBrowserTheme);
  const nextTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.backgroundColor = themeBackgrounds[theme];
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <div className="flex min-h-dvh flex-col bg-background">
        <header className="w-full px-5 py-5 sm:px-6 sm:py-6">
          <div className="mx-auto flex w-full max-w-6xl items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-4 rounded-md text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-special focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Foxling home"
            >
              <img
                src="/icon/icon-cropped.png"
                alt=""
                className="h-10 w-auto shrink-0 sm:h-11"
                aria-hidden="true"
              />
              <span className="text-2xl font-semibold sm:text-3xl">Foxling</span>
            </Link>
          </div>
        </header>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <footer className="w-full border-t border-border text-sm text-foreground/70">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-6">
            <Link
              to="/privacy-policy"
              onClick={() => window.scrollTo({ top: 0, left: 0 })}
              className="transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-special focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Privacy Policy
            </Link>
            <button
              type="button"
              className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-special focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => setTheme(nextTheme)}
              aria-label={`Switch to ${nextTheme} mode`}
            >
              Theme: {theme === "light" ? "Light" : "Dark"}
            </button>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
