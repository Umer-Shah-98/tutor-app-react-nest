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
exports.StudentController = void 0;
const create_student_dto_1 = require("./dto/create-student.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let StudentController = class StudentController {
    constructor(studentService, jwtService) {
        this.studentService = studentService;
        this.jwtService = jwtService;
    }
    create(student) {
        const studentData = {
            username: student.username,
            email: student.email,
            password: student.password,
            isStudent: student.isStudent,
        };
        return this.studentService.create(studentData);
    }
    async login(loginData) {
        const { email, password } = loginData;
        const student = await this.studentService.findByEmail(email);
        if (!student) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: student.id, username: student.username };
        const token = this.jwtService.sign(payload);
        return {
            token,
            user: {
                id: student.id,
                username: student.username,
                email: student.email,
                isStudent: student.isStudent,
            },
        };
    }
    findAll() {
        return this.studentService.findAll();
    }
    findOne(id) {
        return this.studentService.findOne(id);
    }
    update(id, student) {
        return this.studentService.update(id, student);
    }
    remove(id) {
        return this.studentService.remove(id);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "remove", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('students'),
    __metadata("design:paramtypes", [student_service_1.StudentService,
        jwt_1.JwtService])
], StudentController);
//# sourceMappingURL=student.controller.js.map