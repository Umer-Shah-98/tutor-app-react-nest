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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorController = void 0;
const common_1 = require("@nestjs/common");
const tutor_service_1 = require("./tutor.service");
const create_tutor_dto_1 = require("./dto/create-tutor.dto");
const update_tutor_dto_1 = require("./dto/update-tutor.dto");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let TutorController = class TutorController {
    constructor(tutorService, jwtService) {
        this.tutorService = tutorService;
        this.jwtService = jwtService;
    }
    async create(tutor) {
        try {
            const tutorData = {
                username: tutor.username,
                email: tutor.email,
                password: tutor.password,
                isTutor: tutor.isTutor,
            };
            return this.tutorService.create(tutorData);
        }
        catch (error) {
            return error.error;
        }
    }
    async login(loginData) {
        const { email, password } = loginData;
        const tutor = await this.tutorService.findByEmail(email);
        if (!tutor) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, tutor.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: tutor.id, username: tutor.username };
        const token = this.jwtService.sign(payload);
        return {
            token,
            user: {
                id: tutor.id,
                username: tutor.username,
                email: tutor.email,
                isTutor: tutor.isTutor,
                balance: tutor.balance,
            },
        };
    }
    findAll() {
        return this.tutorService.findAll();
    }
    findOne(id) {
        return this.tutorService.findOne(id);
    }
    update(id, tutor) {
        return this.tutorService.update(id, tutor);
    }
    remove(id) {
        return this.tutorService.remove(id);
    }
};
exports.TutorController = TutorController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tutor_dto_1.CreateTutorDto]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TutorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TutorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tutor_dto_1.UpdateTutorDto]),
    __metadata("design:returntype", void 0)
], TutorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TutorController.prototype, "remove", null);
exports.TutorController = TutorController = __decorate([
    (0, common_1.Controller)('tutors'),
    __metadata("design:paramtypes", [tutor_service_1.TutorService,
        jwt_1.JwtService])
], TutorController);
//# sourceMappingURL=tutor.controller.js.map