const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    // Add SCSS support with modern Sass API
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // Add rule for SCSS files with modern sass-loader
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            api: 'modern',
          },
        },
      ],
    });
    
    return config;
  },
};
export default config;
