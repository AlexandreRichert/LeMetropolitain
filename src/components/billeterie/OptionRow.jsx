"use client";

import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";


export default function OptionRow({ option }) {
  const isSelected = useCartStore((s) => Boolean(s.options[option.id]));
  const toggleOption = useCartStore((s) => s.toggleOption);

  return (
    <button
      type="button"
      data-anim-item
      onClick={() => toggleOption(option.id)}
      aria-pressed={isSelected}
      className={cn(
        "flex w-full items-center justify-between gap-4 border p-5 text-left transition-colors duration-300",
        isSelected ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
      )}
    >
      <span>
        <span className="block font-display text-xl leading-none">{option.label}</span>
        <span className={cn("cartel mt-2 block", isSelected ? "text-paper/60" : "text-stone")}>
          {option.note}
        </span>
      </span>
      <span className="cartel shrink-0">
        {option.price === 0 ? "Offert" : `+ ${formatPrice(option.price)}`}
      </span>
    </button>
  );
}
