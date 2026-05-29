import React from 'react';

// Common icon properties
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// Sleek Facebook Icon
export const FacebookIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// High-fidelity LINE Logo Icon
export const LineIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M22 10.366c0-4.249-4.486-7.708-10-7.708S2 6.117 2 10.366c0 3.799 3.524 6.98 8.29 7.584.323.07.763.243.874.557.101.285.066.731-.032 1.096l-.37 1.579c-.112.482-.544 1.888.236 1.026.78-.862 4.214-4.887 5.748-6.98C20.198 13.905 22 12.3 22 10.366zm-12.723.86H7.954V8.468a.526.526 0 0 0-.526-.525H6.9a.526.526 0 0 0-.526.525v3.284a.526.526 0 0 0 .526.525h2.376a.526.526 0 0 0 .526-.525v-.526a.526.526 0 0 0-.525-.525zm2.846-2.223a.526.526 0 0 0-.526-.525h-.526a.526.526 0 0 0-.526.525v3.284a.526.526 0 0 0 .526.525h.526a.526.526 0 0 0 .526-.525V9.003zm3.968-.525h-.527a.526.526 0 0 0-.526.525v1.492L13.626 8.59a.525.525 0 0 0-.441-.122.526.526 0 0 0-.376.43v3.284a.526.526 0 0 0 .526.525h.526a.526.526 0 0 0 .526-.525v-1.492l1.412 1.907c.097.13.25.21.413.21H16.8a.526.526 0 0 0 .526-.525V9.003a.526.526 0 0 0-.526-.525zm3.433.86h-1.323v-.334a.526.526 0 0 0-.526-.525H18.15a.526.526 0 0 0-.526.525v3.284a.526.526 0 0 0 .526.525h1.876a.526.526 0 0 0 .526-.525v-.526a.526.526 0 0 0-.526-.525H18.67v-.657h1.323a.526.526 0 0 0 .526-.526V9.65c0-.29-.236-.526-.526-.526z" />
  </svg>
);

// Modern Pin / Map Icon
export const MapIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Sleek Envelope Icon
export const MailIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// Modern Clock Icon
export const ClockIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// Security / Trust Badge Icon
export const ShieldCheckIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

// Chevron Right Icon
export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// Star Icon for Premium Styling
export const StarIcon: React.FC<IconProps> = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
