module.exports = {
  apps: [
    {
      name: 'openclaw-core',
      script: 'npm',
      args: 'run start',
      cwd: './',
      watch: false,
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'auto-evolution',
      script: 'node',
      args: 'auto-evolution/index.js',
      cwd: './',
      watch: false,
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'evolver-pcec',
      script: 'node',
      args: 'evolver/start-pcec.js',
      cwd: './',
      watch: false,
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};