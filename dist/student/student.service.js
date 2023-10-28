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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const student_schema_1 = require("./schemas/student.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let StudentService = class StudentService {
    constructor(studentModel) {
        this.studentModel = studentModel;
    }
    async create(student) {
        try {
            const { username, email, password, isStudent } = student;
            const hashedPassword = await bcrypt.hash(password, 5);
            const role = isStudent ? 'student' : 'tutor';
            if (!isStudent) {
                throw new common_1.BadRequestException('Invalid role selected.');
            }
            const newStudent = new this.studentModel({
                username,
                email,
                isStudent,
                password: hashedPassword,
            });
            return await this.studentModel.create(newStudent);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                return { error: error.message };
            }
            else if (error instanceof Error) {
                return {
                    error: 'An error occurred on the server. Please try again later.',
                };
            }
        }
    }
    async findAll() {
        const students = await this.studentModel.find().exec();
        return students.map((student) => ({
            id: student.id,
            username: student.username,
            email: student.email,
        }));
    }
    async findOne(id) {
        let student;
        try {
            student = await this.studentModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
        if (!student) {
            throw new common_1.NotFoundException();
        }
        return {
            id: student.id,
            username: student.username,
            email: student.email,
        };
    }
    async update(id, student) {
        let updatedStudent;
        try {
            updatedStudent = await this.studentModel.findByIdAndUpdate(id, student, {
                new: true,
                runValidators: true,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
        if (!updatedStudent) {
            throw new common_1.NotFoundException();
        }
        return updatedStudent;
    }
    async remove(id) {
        const removedStudent = await this.studentModel.findByIdAndRemove(id);
        return `Student with id: ${removedStudent.id} is removed`;
    }
    async findByEmail(email) {
        try {
            return await this.studentModel.findOne({ email }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StudentService);
//# sourceMappingURL=student.service.js.map