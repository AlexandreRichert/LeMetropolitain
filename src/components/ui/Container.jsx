import { cn } from "@/lib/utils";

/**
 * Container — la largeur du site est définie ICI, une seule fois.
 * Aucun autre composant ne gère de max-width ni de padding horizontal.
 */
export default function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[100rem] px-gutter md:px-10", className)} {...props}>
      {children}
    </Tag>
  );
}
