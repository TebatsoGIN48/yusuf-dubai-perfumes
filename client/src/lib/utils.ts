import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWhatsAppLink(productName: string, price: string, customMessage?: string): string {
  const message = customMessage || `Hi, I'm interested in ${productName} - R${price}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/27713003566?text=${encodedMessage}`;
}

export function calculateDiscount(originalPrice: string, price: string): number {
  const original = parseFloat(originalPrice);
  const current = parseFloat(price);
  return Math.round(((original - current) / original) * 100);
}

export function formatPrice(price: string): string {
  return `R${parseFloat(price).toFixed(2)}`;
}

export function scrollToElement(elementId: string): void {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
