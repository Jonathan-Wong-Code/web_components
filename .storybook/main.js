module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
  ],
};
