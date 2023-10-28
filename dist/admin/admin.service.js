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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const admin_schema_1 = require("./schemas/admin.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let AdminService = class AdminService {
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async create(admin) {
        try {
            const { username, email, password, isAdmin } = admin;
            const hashedPassword = await bcrypt.hash(password, 5);
            const role = 'admin';
            if (!isAdmin) {
                throw new common_1.BadRequestException();
            }
            const newAdmin = new this.adminModel({
                username,
                email,
                isAdmin,
                password: hashedPassword,
                role,
            });
            return await this.adminModel.create(newAdmin);
        }
        catch (error) {
            throw new common_1.BadRequestException('Email is already existed, try a unique one or You entered incomplete credentials.');
        }
    }
    async findAll() {
        const admins = await this.adminModel.find().exec();
        return admins.map((admin) => ({
            id: admin.id,
            username: admin.username,
            email: admin.email,
        }));
    }
    async findOne(id) {
        let admin;
        try {
            admin = await this.adminModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
        if (!admin) {
            throw new common_1.NotFoundException();
        }
        return {
            id: admin.id,
            username: admin.username,
            email: admin.email,
        };
    }
    async update(id, admin) {
        let updatedAdmin;
        try {
            updatedAdmin = await this.adminModel.findByIdAndUpdate(id, admin, {
                new: true,
                runValidators: true,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
        if (!updatedAdmin) {
            throw new common_1.NotFoundException();
        }
        return updatedAdmin;
    }
    async remove(id) {
        const removedAdmin = await this.adminModel.findByIdAndRemove(id);
        return `Tutor with id: ${removedAdmin.id} is removed`;
    }
    async findByEmail(email) {
        try {
            return await this.adminModel.findOne({ email }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map