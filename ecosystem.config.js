module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    'apps': [
        // First application
        {
            'name': 'web-starter-kit',
            'script': '.',
            'env_production': {
                'NODE_ENV': 'production',
                'PORT': 8000
            }
        }
    ]
};

