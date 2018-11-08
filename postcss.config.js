module.exports = {
    plugins: {
        autoprefixer: {},
        tailwindcss: './tailwind.config.js',
        '@fullhuman/postcss-purgecss': {
            content: ['./src/components/*.vue'],
            whitelistPatterns: [
                /^focus\:ads-outline-none$/,
                /^hover\:ads-bg-grey-lighter$/,
            ],
        },
        'postcss-import': {},
        'postcss-url': {},
    },
};
