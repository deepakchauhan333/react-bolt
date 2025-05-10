// heroicons.d.ts

// Declare the module for Solid Heroicons
declare module '@heroicons/react/solid' {
  import { FC, SVGProps } from 'react';

  // Define a general SVG component for each Heroicon
  export const ArrowLeftIcon: FC<SVGProps<SVGSVGElement>>;
  export const ArrowRightIcon: FC<SVGProps<SVGSVGElement>>;
  export const SearchIcon: FC<SVGProps<SVGSVGElement>>;
  export const ExternalLinkIcon: FC<SVGProps<SVGSVGElement>>;
  // Add more icons if you need them, in the same pattern

  // You can import and use them like:
  // import { ArrowLeftIcon } from '@heroicons/react/solid';
}

// Declare the module for Outline Heroicons
declare module '@heroicons/react/outline' {
  import { FC, SVGProps } from 'react';

  // Define a general SVG component for each Heroicon
  export const ArrowLeftIcon: FC<SVGProps<SVGSVGElement>>;
  export const ArrowRightIcon: FC<SVGProps<SVGSVGElement>>;
  export const SearchIcon: FC<SVGProps<SVGSVGElement>>;
  export const ExternalLinkIcon: FC<SVGProps<SVGSVGElement>>;
  // Add more icons if you need them, in the same pattern

  // You can import and use them like:
  // import { ArrowLeftIcon } from '@heroicons/react/outline';
}
