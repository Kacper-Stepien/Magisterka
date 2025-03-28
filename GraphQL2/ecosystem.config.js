module.exports = {
  apps: [
    {
      script: 'dist/main.js',
      instances: 4,
      exec_mode: 'cluster',
    },
  ],
};
