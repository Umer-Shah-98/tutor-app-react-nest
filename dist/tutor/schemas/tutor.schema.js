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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorSchema = exports.Tutor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
let Tutor = class Tutor extends mongoose_2.Document {
};
exports.Tutor = Tutor;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tutor.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], Tutor.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Tutor.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false,
        required: true,
        validate: [class_validator_1.IsBoolean, 'Tutor field must be a boolean'],
    }),
    __metadata("design:type", Boolean)
], Tutor.prototype, "isTutor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'tutor' }),
    __metadata("design:type", String)
], Tutor.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Tutor.prototype, "balance", void 0);
exports.Tutor = Tutor = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Tutor);
exports.TutorSchema = mongoose_1.SchemaFactory.createForClass(Tutor);
//# sourceMappingURL=tutor.schema.js.map