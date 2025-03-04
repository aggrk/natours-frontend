const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#10B981",
      },
    },
    animation: {
      "slide-up": "slideUp 0.8s ease-out",
      bounce: "bounce 2s infinite",
    },
    keyframes: {
      slideUp: {
        "0%": { transform: "translateY(20px)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
    },
  },
  plugins: [],
});
