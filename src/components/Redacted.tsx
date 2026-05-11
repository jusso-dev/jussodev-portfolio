import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  label?: string;
};

export function Redacted({ children, label }: Props) {
  return (
    <button
      type="button"
      className="redacted"
      aria-label={label ?? "Declassify on activation"}
    >
      {children}
    </button>
  );
}
