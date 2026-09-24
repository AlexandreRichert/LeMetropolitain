"use client";

import { useId, useState } from "react";
import { PASSWORD_REQUIREMENTS } from "@/lib/password";
import { cn } from "@/lib/utils";


export default function PasswordField({
  id,
  label,
  value,
  error,
  showRequirements = false,
  className,
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const requirementsId = useId();
  const describedBy =
    [showRequirements && requirementsId, error && `${id}-error`]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={cn("group grid gap-2", className)}>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="cartel text-stone">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="cartel text-stone transition-colors duration-300 hover:text-accent"
          aria-pressed={visible}
        >
          {visible ? "Masquer" : "Afficher"}
        </button>
      </div>

      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full border-b bg-transparent py-2 text-ink placeholder:text-stone focus:outline-none",
            error ? "border-accent" : "border-line",
          )}
          {...props}
        />
        <span
          aria-hidden="true"
          className="brush-underline pointer-events-none absolute inset-x-0 -bottom-[3px] block h-2.5 bg-[length:0%_10px] transition-[background-size] duration-500 ease-out-expo group-focus-within:bg-[length:100%_10px]"
        />
      </div>

      {showRequirements && (
        <ul id={requirementsId} className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
          {PASSWORD_REQUIREMENTS.map((rule) => {
            const met = rule.test(value || "");
            return (
              <li
                key={rule.id}
                className={cn(
                  "flex items-center gap-1.5 text-xs transition-colors duration-300",
                  met ? "text-accent" : "text-stone",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2 w-2 rounded-full border transition-colors duration-300",
                    met
                      ? "border-accent bg-accent"
                      : "border-line bg-transparent",
                  )}
                />
                {rule.label}
              </li>
            );
          })}
        </ul>
      )}

      {error && (
        <p id={`${id}-error`} className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
