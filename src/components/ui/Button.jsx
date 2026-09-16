import Link from "@/components/ui/Link";
import { cn } from "@/lib/utils";

/**
 * Button — un seul composant pour les 3 cas : lien interne, lien externe, bouton.
 * Les variantes sont des données (objet VARIANTS), pas des conditions imbriquées :
 * en ajouter une ne demande pas de toucher au JSX.
 */
const VARIANTS = {
  solid: "bg-accent text-paper hover:bg-accent-hover",
  outline: "border border-line text-ink hover:border-accent hover:bg-paper-2",
  ghost: "text-ink hover:text-accent",
};

/* Les tailles ne touchent QU'À la boîte : la taille de texte vient de `cartel`,
   pour éviter deux utilitaires de même spécificité qui se disputent. */
const SIZES = {
  sm: "h-9 px-4",
  md: "h-12 px-7",
};

export default function Button({
  href,
  external = false,
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}) {
  const classes = cn(
    "cartel inline-flex items-center justify-center gap-2 rounded transition-colors duration-300 ease-out-expo disabled:cursor-not-allowed disabled:opacity-40",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
