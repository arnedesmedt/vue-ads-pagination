module.exports = {
    plugins: {
        autoprefixer: {},
        tailwindcss: './tailwind.config.js',
        '@fullhuman/postcss-purgecss': {
            content: ['./src/components/*.vue'],
            whitelistPatterns: [
                /^focus\:outline-none$/,
                /^hover\:bg-grey-lighter$/,
            ],
        },
        'postcss-import': {},
        'postcss-url': {},
    },
};
