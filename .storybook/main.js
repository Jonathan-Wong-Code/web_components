module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/preset-create-react-app',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-controls',
  ],
};
