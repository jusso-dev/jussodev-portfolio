type Props = { position: "top" | "bottom" };

export function ClassificationBanner({ position }: Props) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`classification classification--${position}`}
    >
      <span className="classification__inner">
        {"// UNCLASSIFIED // PUBLIC RELEASE // FOR REVIEW //"}
      </span>
    </div>
  );
}
