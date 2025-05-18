// next.config.ts or next.config.js
const nextConfig = {
    webpack(config: any) {
        // Exclude svg from default file loader
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.(".svg")
        );
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/i;
        }

        // Add SVGR
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

export default nextConfig;
