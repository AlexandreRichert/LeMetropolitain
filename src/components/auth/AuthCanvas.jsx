import { cn } from "@/lib/utils";

export default function AuthCanvas({ children, className }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-md pb-8", className)}>
      <div className="canvas-weave relative border border-line bg-paper px-8 py-10 shadow-ambient sm:px-10 sm:py-12">
        {children}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-6 -bottom-1 h-[3px] bg-line"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-1 left-10 h-7 w-px origin-top rotate-[16deg] bg-line"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-1 right-10 h-7 w-px origin-top -rotate-[16deg] bg-line"
      />
    </div>
  );
}
