const express = require('express');
const router = express.Router();
const registerRoutes = require('./register.js');
const routes = [
    {
        path: '/',
        route: registerRoutes,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
