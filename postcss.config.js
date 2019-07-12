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
                /^hover:vue-ads-bg-gray-100$/,
            ],
        },
        'postcss-import': {},
        'postcss-url': {},
    },
};
