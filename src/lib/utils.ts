import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function activateOnKey(e: React.KeyboardEvent<HTMLElement>) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.currentTarget.click();
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
