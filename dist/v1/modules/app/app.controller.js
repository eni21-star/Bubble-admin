"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_config_1 = require("../../../config/route.config");
class AppController {
    async appController(req, res, next) {
        return res.status(200).json({
            name: 'FSL-API',
            Version: `${route_config_1.RouteVersion.v1}`
        });
    }
}
exports.default = AppController;
