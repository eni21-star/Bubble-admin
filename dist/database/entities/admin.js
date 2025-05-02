"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const refreshToken_entities_1 = __importDefault(require("./refreshToken.entities"));
const blog_entities_1 = __importDefault(require("./blog.entities"));
let Admin = class Admin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Admin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'varchar' }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Admin.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Admin.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refreshToken_entities_1.default, refreshToken => refreshToken.admin),
    __metadata("design:type", Array)
], Admin.prototype, "refreshTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blog_entities_1.default, blog => blog.createdBy),
    __metadata("design:type", Array)
], Admin.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Admin.prototype, "dateCreated", void 0);
Admin = __decorate([
    (0, typeorm_1.Entity)('Admin')
], Admin);
exports.default = Admin;
