module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : "pi-wall-project",
      script    : "server/index.js",
      env_production : {
        NODE_ENV: "production",
	PORT: 80
      }
    }
  ]
}
