import { cn } from "@/lib/utils";

/**
 * Select — champ natif restylé. Volontairement non contrôlé en interne :
 * c'est l'appelant (ArtworkFilters) qui décide de la valeur et de l'action.
 * Un <select> natif = accessible, utilisable au clavier, parfait sur mobile.
 */
export default function Select({ label, options = [], className, ...props }) {
  return (
    <label className={cn("group flex flex-col gap-2", className)}>
      <span className="cartel text-stone">{label}</span>
      <div className="relative">
        <select
          className="w-full appearance-none border-b border-line bg-transparent py-2 pr-8 text-sm text-ink transition-colors duration-300 hover:border-ink focus:border-accent focus:outline-none"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-stone"
        >
          ↓
        </span>
      </div>
    </label>
  );
}
