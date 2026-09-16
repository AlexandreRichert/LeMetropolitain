import { cn } from "@/lib/utils";
import Container from "./Container";

export default function Section({
  eyebrow,
  title,
  intro,
  action,
  as = "section",
  className,
  headerClassName,
  children,
  ...props
}) {
  const Tag = as;

  return (
    <Tag className={cn("py-section", className)} {...props}>
      <Container>
        {(eyebrow || title || action) && (
          <div
            className={cn(
              "mb-12 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-end md:justify-between",
              headerClassName,
            )}
          >
            <div className="max-w-3xl">
              {eyebrow && <p className="cartel mb-6 text-stone">{eyebrow}</p>}
              {title && <h2 className="text-title">{title}</h2>}
              {intro && (
                <p className="mt-6 max-w-xl text-lead text-ink-2">{intro}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </Container>
    </Tag>
  );
}
