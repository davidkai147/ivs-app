module.exports = {
    apps: [
        {
            name: 'IVS-app',
            script: './server.js',
            instances: 1,
            autorestart: true,
            watch: true,
            time: true,
            env: {
                NODE_ENV: 'development',
            },
        },
    ],
};
