/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-main": "var(--text-main)",
        "text-muted": "var(--text-muted)",
        "background": "var(--background)",
        "surface": "var(--surface)",
        "surface-light": "var(--surface-light)",
        "border": "var(--border)",
        "secondary": "#cdc0e9",
        "on-surface": "#e6e0e9",
        // ... (rest of existing colors if needed, but primary focus is the theme variables)
        "primary": "#cfbcff",
        "deep-slate": "#1F2A38",
        "electric-blue": "#00A8E8"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "xl": "40px",
        "margin": "32px",
        "md": "16px",
        "lg": "24px",
        "sm": "8px",
        "gutter": "20px",
        "xs": "4px",
        "unit": "4px"
      },
      fontFamily: {
        "display-lg": ["Manrope"],
        "label-sm": ["Inter"],
        "headline-md": ["Manrope"],
        "label-md": ["Inter"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"],
        "headline-sm": ["Manrope"]
      },
      fontSize: {
        "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-sm": ["12px", {"lineHeight": "1.2", "letterSpacing": "0.08em", "fontWeight": "600"}],
        "headline-md": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "label-md": ["14px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-sm": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}]
      }
    },
  },
  plugins: [],
}
