/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    {relative: true,
      transform: (content) => content.replace(/taos:/g, ''),
      files: ['./src/*.{html,js}'],
    },
  ],
  safelist: [
    '!duration-[0ms]',
    '!delay-[0ms]',
    'html.js :where([class*="taos:"]:not(.taos-init))'
  ],

  plugins: [
    require("flowbite/plugin")
  ],
  theme: {},
};
