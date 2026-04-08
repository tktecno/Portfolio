import { useEffect } from "react";

const DEFAULT_IMAGE_PATH = "/tps2.webp";
const DEFAULT_ROBOTS = "index,follow,max-image-preview:large";

function toAbsoluteUrl(pathOrUrl) {
  if (typeof window === "undefined") {
    return pathOrUrl;
  }

  try {
    return new URL(pathOrUrl, window.location.origin).toString();
  } catch {
    return pathOrUrl;
  }
}

function upsertMeta(attribute, key, content) {
  if (!content) {
    return;
  }

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) {
    return;
  }

  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE_PATH,
  robots = DEFAULT_ROBOTS,
  type = "website",
  jsonLd = [],
}) {
  const jsonLdKey = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);

  useEffect(() => {
    const canonicalUrl =
      typeof window === "undefined"
        ? path
        : toAbsoluteUrl(path || window.location.pathname);
    const imageUrl = toAbsoluteUrl(image);
    const normalizedJsonLd = JSON.parse(jsonLdKey);

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "author", "Tapash Roy");
    upsertMeta("property", "og:site_name", "Tapash Roy Portfolio");
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertLink("canonical", canonicalUrl);

    document
      .querySelectorAll('script[data-seo-json-ld="true"]')
      .forEach((element) => element.remove());

    normalizedJsonLd.filter(Boolean).forEach((entry) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonLd = "true";
      script.text = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }, [description, image, jsonLdKey, path, robots, title, type]);

  return null;
}
