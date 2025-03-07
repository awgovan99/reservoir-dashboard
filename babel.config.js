module.exports = {
    presets: [
      'next/babel' // This preset is specifically designed for Next.js
    ],
    plugins: [
        ["module-resolver",
          {
            root: ["."],
            alias: {"@": "./",},
          },
        ],
      ],
};