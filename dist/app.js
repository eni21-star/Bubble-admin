"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./shared/errors/errors");
const errors_1 = require("./shared/errors/errors");
const route_config_1 = require("./config/route.config");
const health_route_1 = __importDefault(require("./v1/modules/health/health.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const refreshToken_routes_1 = __importDefault(require("./v1/modules/admin/routes/refreshToken.routes"));
const blog_routes_1 = __importDefault(require("./v1/modules/admin/routes/blog.routes"));
const app_routes_1 = __importDefault(require("./v1/modules/app/app.routes"));
const invite_routes_1 = __importDefault(require("./v1/modules/admin/routes/invite.routes"));
const images_routes_1 = __importDefault(require("./v1/modules/admin/routes/images.routes"));
const careers_routes_1 = __importDefault(require("./v1/modules/public/routes/careers.routes"));
const file_parser_routes_1 = __importDefault(require("./v1/modules/admin/routes/file-parser.routes"));
const popup_routes_1 = __importDefault(require("./v1/modules/public/routes/popup.routes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const suscribe_routes_1 = __importDefault(require("./v1/modules/public/routes/suscribe.routes"));
const auth_routes_1 = __importDefault(require("./v1/modules/admin/routes/auth.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app
    .use((0, helmet_1.default)())
    .use((0, cors_1.default)({
    credentials: true,
    origin: [
        'http://localhost:3000',
    ],
}));
app.use('/app', app_routes_1.default);
app.use('/health', health_route_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, auth_routes_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, refreshToken_routes_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, blog_routes_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, invite_routes_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, images_routes_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, careers_routes_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, file_parser_routes_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, popup_routes_1.default);
app.use(`/api/${route_config_1.RouteVersion.v1}`, suscribe_routes_1.default);
app.use(errors_1.errorHandler);
exports.default = app;
