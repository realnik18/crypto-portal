import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency
 * @param value - Number to format
 * @param currency - Currency code
 * @param notation - Compact or standard notation
 */
export function formatCurrency(
  value: number, 
  currency = 'USD',
  notation: Intl.NumberFormatOptions['notation'] = 'compact'
): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(value);
}

/**
 * Format a number with commas
 * @param value - Number to format
 * @param notation - Compact or standard notation
 */
export function formatNumber(
  value: number,
  notation: Intl.NumberFormatOptions['notation'] = 'standard'
): string {
  const formatter = new Intl.NumberFormat('en-US', {
    notation,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(value);
}

/**
 * Format a date
 * @param date - Date to format
 * @param options - Date formatting options
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(d);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random ID
 */
export function generateId(length = 10): string {
  return Math.random().toString(36).substring(2, 2 + length);
}
