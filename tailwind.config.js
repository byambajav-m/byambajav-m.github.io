/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#F6F2EB",
          secondary: "#EFEAE0",
          elevated: "#FFFFFF",
          card: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#1A1A18",
          hover: "#000000",
          dim: "rgba(26, 26, 24, 0.05)",
          border: "rgba(26, 26, 24, 0.18)",
        },
        text: {
          primary: "#1A1A18",
          secondary: "#4A4843",
          muted: "#8A8680",
        },
        border: {
          DEFAULT: "rgba(26, 26, 24, 0.10)",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "28px",
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.035em",
      },
      lineHeight: {
        editorial: "1.6",
      },
      boxShadow: {
        paper: "0 1px 2px rgba(26, 26, 24, 0.04), 0 8px 24px -12px rgba(26, 26, 24, 0.08)",
      },
    },
  },
  plugins: [],
};
