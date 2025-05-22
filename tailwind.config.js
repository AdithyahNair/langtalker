/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#111827",
          light: "#1f2937",
          dark: "#030712",
        },
        accent: {
          DEFAULT: "#7BA69E",
          light: "#8fb3ac",
          dark: "#648c84",
        },
        navy: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
        },
        background: "#ffffff",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        button: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.white"),
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.400"),
              },
            },
            strong: {
              color: theme("colors.white"),
            },
            "ol > li::marker": {
              color: theme("colors.gray.400"),
            },
            "ul > li::marker": {
              color: theme("colors.gray.400"),
            },
            hr: {
              borderColor: theme("colors.gray.800"),
            },
            blockquote: {
              color: theme("colors.gray.400"),
              borderLeftColor: theme("colors.gray.800"),
            },
            h1: {
              color: theme("colors.white"),
            },
            h2: {
              color: theme("colors.white"),
            },
            h3: {
              color: theme("colors.white"),
            },
            h4: {
              color: theme("colors.white"),
            },
            "figure figcaption": {
              color: theme("colors.gray.400"),
            },
            code: {
              color: theme("colors.white"),
              backgroundColor: theme("colors.gray.800"),
              borderRadius: theme("borderRadius.md"),
              paddingLeft: theme("spacing.1"),
              paddingRight: theme("spacing.1"),
            },
            "pre code": {
              backgroundColor: "transparent",
              borderRadius: 0,
              padding: 0,
            },
            pre: {
              color: theme("colors.white"),
              backgroundColor: theme("colors.gray.900"),
            },
            thead: {
              color: theme("colors.white"),
              borderBottomColor: theme("colors.gray.800"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.gray.800"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
