module.exports = {
    plugins: {
        autoprefixer: {},
        tailwindcss: './tailwind.config.js',
        '@fullhuman/postcss-purgecss': {
            content: [
                './src/components/*.vue',
            ],
            whitelistPatterns: [
                /^focus:vue-ads-outline-none$/,
                /^hover:vue-ads-bg-grey-lighter$/,
            ],
        },
        'postcss-import': {},
        'postcss-url': {},
    },
};
