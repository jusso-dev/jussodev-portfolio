type Props = {
  index: string;
  name: string;
  description: string;
  lang: string;
  updated: string;
  href: string;
};

export function ArtifactRow({
  index,
  name,
  description,
  lang,
  updated,
  href,
}: Props) {
  return (
    <a
      className="artifact"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} — open repository on GitHub`}
    >
      <span className="artifact__index" aria-hidden="true">
        {index}
      </span>
      <div className="artifact__body">
        <h3 className="artifact__name">{name}</h3>
        <p className="artifact__desc">{description}</p>
        <p className="artifact__meta">
          <span>{lang}</span>
          <span aria-hidden="true">·</span>
          <span>UPD {updated}</span>
        </p>
      </div>
      <span className="artifact__glyph" aria-hidden="true">
        &gt;
      </span>
    </a>
  );
}
