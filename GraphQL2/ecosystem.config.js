module.exports = {
  apps: [
    {
      script: 'dist/main.js',
      instances: 8,
      exec_mode: 'cluster',
    },
  ],
};
