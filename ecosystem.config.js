module.exports = {
  apps: [
    {
      name: 'nestjs-prod',
      script: './dist/main.js', // cluster mode run with node only, not npm
      args: '',
      exec_mode: 'cluster', // default fork
      instances: 2, //"max",
      kill_timeout: 4000,
      wait_ready: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
