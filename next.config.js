const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["sturdy-garbanzo-p5w9pqg5pgg379q-3000.app.github.dev", "localhost:3000"],
        },
    },
};

module.exports = withNextIntl(nextConfig);
