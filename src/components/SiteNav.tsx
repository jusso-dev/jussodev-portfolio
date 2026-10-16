type Props = { current: "dossier" | "blog" | null };

const links = [
  { key: "dossier", href: "/", label: "Dossier" },
  { key: "blog", href: "/blog/", label: "Blog" },
] as const;

export function SiteNav({ current }: Props) {
  return (
    <nav className="sitenav" aria-label="Site">
      <span className="sitenav__mark" aria-hidden="true">
        {"// INDEX"}
      </span>
      <ul className="sitenav__list">
        {links.map((link) => (
          <li key={link.key}>
            <a
              className="sitenav__link"
              href={link.href}
              aria-current={current === link.key ? "page" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a className="sitenav__link" href="/blog/rss.xml">
            RSS
          </a>
        </li>
      </ul>
    </nav>
  );
}
