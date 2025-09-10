module.exports = {
  theme: {
    extend: {
      keyframes: {
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-out": "fade-out 1s ease-in-out forwards",
      },
    },
  },
};
