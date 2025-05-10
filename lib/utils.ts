import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function truncate(str: string, length: number) {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function getRandomGradient() {
  const gradients = [
    'bg-gradient-to-r from-blue-500 to-purple-600',
    'bg-gradient-to-r from-emerald-500 to-teal-600',
    'bg-gradient-to-r from-orange-500 to-amber-600',
    'bg-gradient-to-r from-pink-500 to-rose-600',
    'bg-gradient-to-r from-indigo-500 to-sky-600',
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
}

export function getCategoryIcon(category?: string) {
  const iconMap: Record<string, string> = {
    'text generation': 'MessageSquare',
    'image generation': 'Image',
    'code assistance': 'Code2',
    'data analysis': 'BarChart',
    'automation': 'Zap',
    'research': 'Search',
    'audio generation': 'Music',
    'video generation': 'Video',
    'chatbots': 'MessageCircle',
    'writing': 'PenTool',
    'design': 'Palette',
  };
  
  const defaultIcon = 'Sparkles';
  
  if (!category) return defaultIcon;
  
  const normalizedCategory = category.toLowerCase();
  
  // Try exact match
  if (iconMap[normalizedCategory]) {
    return iconMap[normalizedCategory];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(iconMap)) {
    if (normalizedCategory.includes(key)) {
      return value;
    }
  }
  
  return defaultIcon;
}