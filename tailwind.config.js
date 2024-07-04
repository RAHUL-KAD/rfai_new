/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Code blocks
            'pre code': {
              backgroundColor: 'transparent',
              color: theme('colors.gray.200'),
              padding: theme('spacing.2'),
              borderRadius: theme('borderRadius.md'),
              overflowX: 'auto',
            },
            // Headings
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: theme('fontWeight.bold'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.4'),
              letterSpacing: theme('letterSpacing.tight'),
            },
            // Paragraphs
            p: {
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
              lineHeight: theme('lineHeight.relaxed'),
            },
            // Lists
            ul: {
              listStyleType: 'disc',
              marginLeft: theme('spacing.6'),
            },
            ol: {
              listStyleType: 'decimal',
              marginLeft: theme('spacing.6'),
            },
            // Links
            a: {
              color: theme('colors.blue.500'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],

   // daisyUI config (optional - here are the default values)
   daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "LIGHT", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
