import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  rotate?: number;
};

export function Stamp({ children, rotate = -8 }: Props) {
  return (
    <span
      className="stamp"
      role="img"
      aria-label={typeof children === "string" ? children : "Stamp"}
      style={{ "--rotate": `${rotate}deg` } as CSSProperties}
    >
      {children}
    </span>
  );
}
