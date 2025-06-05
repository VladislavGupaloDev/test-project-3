import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

//* Удобно использовтаь после Shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
