import { cn } from "@/lib/utils";


export default function AuthField({ id, label, error, className, ...props }) {
  return (
    <div className={cn("group grid gap-2", className)}>
      <label htmlFor={id} className="cartel text-stone">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
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
      {error && (
        <p id={`${id}-error`} className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
