import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
   /* Brand Colors */
   --color-brand-50: #e1f6f4;
   --color-brand-100: #c3edea;
   --color-brand-200: #a3e4df;
   --color-brand-500: #69bfaf;
   --color-brand-600: #5aa89a;
   --color-brand-700: #4b9185;
   --color-brand-800: #3c7a70;
   --color-brand-900: #2d635b;

   /* Additional Colors */
   --color-orange-50: #fff7ed;
   --color-orange-100: #ffedd5;
   --color-orange-200: #fed7aa;
   --color-orange-500: #f97316;
   --color-orange-600: #ea580c;
   --color-orange-700: #c2410c;
   --color-orange-800: #9a3412;
   --color-orange-900: #7c2d12;

   /* Green Colors */
   --color-green-50: #e0ebeb;
   --color-green-100: #c2d7d7;
   --color-green-200: #85b0b0;
   --color-green-500: #165359;
   --color-green-600: #144b50;
   --color-green-700: #124348;
   --color-green-800: #103b40;
   --color-green-900: #0e3338;

   
   /* Light Mode Colors */
   &, &.light-mode {
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;
     /* Grey */
     --color-grey-0: #fff;
     --color-grey-50: #f9fafb;
     --color-grey-100: #f3f4f6;
     --color-grey-200: #e5e7eb;
     --color-grey-300: #d1d5db;
     --color-grey-400: #9ca3af;
     --color-grey-500: #6b7280;
     --color-grey-600: #4b5563;
     --color-grey-700: #374151;
     --color-grey-800: #1f2937;
     --color-grey-900: #111827;

     --color-yellow-100: #fef9c3;
     --color-yellow-700: #a16207;

     --color-green-1-100: #d1fae5;
     --color-green-1-700: #047857;

     --color-blue-100: #dbeafe;
     --color-blue-700: #1d4ed8;

     --color-gold-100: #fef3c7;
     --color-gold-700: #b45309;

     /* Blue */
     --color-blue-100: #e0f2fe;
     --color-blue-700: #0369a1;

     /* Shadows */
     --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
     --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
     --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
   }

   &.dark-mode {
   /* Red Colors */
   --color-red-100: #f8d7da; // Новый светло-красный цвет
    --color-red-700: #dc3545; // Основной красный цвет
    --color-red-800: #b71c1c; // Темно-красный цвет
     /* Grey */
     --color-grey-0: #18212f;
     --color-grey-50: #111827;
     --color-grey-100: #1f2937;
     --color-grey-200: #374151;
     --color-grey-300: #4b5563;
     --color-grey-400: #6b7280;
     --color-grey-500: #9ca3af;
     --color-grey-600: #d1d5db;
     --color-grey-700: #e5e7eb;
     --color-grey-800: #f3f4f6;
     --color-grey-900: #f9fafb;

     /* Brand Colors for Dark Mode */
     --color-brand-50: #1f3c3b; /* Darker shade */
     --color-brand-100: #2a4f4d; /* Darker shade */
     --color-brand-200: #3a706d; /* Darker shade */
     --color-brand-500: #69bfaf; /* Same as light */
     --color-brand-600: #8cd6d3; /* Lighter shade */
     --color-brand-700: #a4e0dd; /* Lighter shade */
     --color-brand-800: #c1f1ef; /* Lighter shade */
     --color-brand-900: #d7f9f8; /* Lightest shade */

     /* Orange Colors for Dark Mode */
     --color-orange-50: #4d1c0f; /* Darker shade */
     --color-orange-100: #60240e; /* Darker shade */
     --color-orange-200: #7a310e; /* Darker shade */
     --color-orange-500: #f97316; /* Same as light */
     --color-orange-600: #ff9f4d; /* Lighter shade */
     --color-orange-700: #ffb075; /* Lighter shade */
     --color-orange-800: #ffdbb0; /* Lighter shade */
     --color-orange-900: #ffe4d9; /* Lightest shade */

     /* Green Colors for Dark Mode */
     --color-green-50: #1e2e2e; /* Darker shade */
     --color-green-100: #2a4444; /* Darker shade */
     --color-green-200: #4a7a7a; /* Darker shade */
     --color-green-500: #165359; /* Same as light */
     --color-green-600: #007a7a; /* Lighter shade */
     --color-green-700: #009292; /* Lighter shade */
     --color-green-800: #00b3b3; /* Lighter shade */
     --color-green-900: #00cccc; /* Lightest shade */

     /* Red Colors for Dark Mode */
     --color-red-100: #6e1f1f; /* Darker shade */
     --color-red-700: #b91c1c; /* Same as light */
     --color-red-800: #991b1b; /* Same as light */

     /* Shadows */
     --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
     --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
     --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

     /* Other */
     --backdrop-color: rgba(0, 0, 0, 0.3);
     --image-grayscale: 10%;
     --image-opacity: 90%;
   }

  /* Border Radius */
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
    font-family: "Montserrat", sans-serif;
  color: var(--color-grey-700);
  background-color: var(--color-grey-0);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
