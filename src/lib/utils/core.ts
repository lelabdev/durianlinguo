import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

// Merge class names safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Example Zod schema shortcut
import { z } from "zod";
export const stringRequired = z.string().min(1, "Required");

// Export SuperForm helpers if needed later
export function formatDate(date: string) {
  const dateObj = date ? new Date(date) : new Date();
  return dateObj.toLocaleDateString();
}

// helper to scroll on x axis
export function scrollX(node: HTMLElement) {
  let handle = (e: WheelEvent) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    node.scrollLeft += e.deltaY;
  };

  node.addEventListener("wheel", handle, { passive: false });

  return {
    destroy() {
      node.removeEventListener("wheel", handle);
    },
  };
}

export function toEuro(amount: number | null | undefined): string {
  const amountToFormat =
    typeof amount === "number" && isFinite(amount) ? amount : 0;
  if (amountToFormat === 0) return "Sur demande";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "eur",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountToFormat);
}
