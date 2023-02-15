const colors = require('tailwindcss/colors');
//this plugin ( bottom ) will apply a class on firefox,
// in this case, it will apply opacity to a div so is not so opaque because of blur no being supported on Firefox
const plugin = require("tailwindcss/plugin");
module.exports = {
  //mode: 'jit',
  //purge: ['./src/**/*.html'],
  //darkMode: 'media', // or 'media' or 'class'
  theme: {


    extend: {


      colors: {
        blueGray: colors.blueGray,
        blue: colors.blue,
        royalBlue:"#4158D0",
        midnight:"#1d1b3c",
        dull:"#C850C0",
        tainoi:"#FFCC70",
        gum: "#FF597B",
        pink: "#FF8E9E"
      },
      fontFamily: {
        sans: [
          '"Inter"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',] // Ensure fonts with spaces have " " surrounding it.
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
}