"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthController {
    chechHealth(req, res, next) {
        try {
            res.status(200).json({
                status: 'Running',
                timestamp: new Date()
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = HealthController;
