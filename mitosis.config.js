/* eslint-disable no-undef */
const targets = [
  'angular',
  'qwik',
  'react',
  'svelte',
  'vue3',
  'solid',
  'webcomponent',
  'template',
];
module.exports = {
  files: 'src/**',
  targets,
  options: {
    react: {
      typescript: true,
    },
    svelte: {
      typescript: true,
    },
    qwik: {
      typescript: true,
    },
  },
};
