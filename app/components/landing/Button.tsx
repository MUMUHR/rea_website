"use client";

import React from "react";
import Link from "next/link";

/* ============================================================
   Button Component
   Variants:
   - "filled"  → solid brand red, darken + scale on hover
   - "ghost"   → border only, directional fill-from-left on hover
   - "ghost-dark" → ghost variant for use on dark backgrounds
   ============================================================ */

type ButtonVariant = "filled" | "ghost" | "ghost-dark";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
}

export default function Button({
  variant = "filled",
  href,
  children,
  className = "",
  id,
  onClick,
  type = "button",
  target,
  rel,
  icon,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-semibold text-sm rounded-md px-5 py-2.5 cursor-pointer select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    filled:
      "bg-brand text-white hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] shadow-sm",
    ghost:
      "btn-ghost-fill border border-[var(--border-light)] text-[var(--text)] hover:text-white",
    "ghost-dark":
      "btn-ghost-fill border border-[var(--border-dark)] text-[var(--text-inv)] hover:text-white",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} id={id} target={target} rel={rel}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} id={id} onClick={onClick}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
