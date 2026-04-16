const FALLBACK_SITE_URL = "https://lakshay-portfolio.vercel.app";
const PLACEHOLDER_HOSTS = new Set(["your-domain.example"]);

function normalizeSiteUrl(raw?: string | null) {
  const value = raw?.trim();
  if (!value) {
    return FALLBACK_SITE_URL;
  }

  try {
    const parsed = new URL(value);
    if (PLACEHOLDER_HOSTS.has(parsed.hostname)) {
      return FALLBACK_SITE_URL;
    }

    parsed.pathname = "";
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

export function canonicalFor(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}
