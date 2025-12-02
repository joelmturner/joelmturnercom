import { clsx, type ClassValue } from "clsx";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes with proper string handling
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
