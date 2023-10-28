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
exports.TutorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tutor_schema_1 = require("./schemas/tutor.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
let TutorService = class TutorService {
    constructor(tutorModel) {
        this.tutorModel = tutorModel;
    }
    async create(tutor) {
        try {
            const { username, email, password, isTutor } = tutor;
            const hashedPassword = await bcrypt.hash(password, 5);
            if (!isTutor) {
                throw new common_1.BadRequestException('Invalid role selected.');
            }
            const newTutor = new this.tutorModel({
                username,
                email,
                isTutor,
                password: hashedPassword,
            });
            return await this.tutorModel.create(newTutor);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                return { error: error.message };
            }
            else {
                return {
                    error: 'An error occurred on the server. Please try again later.',
                };
            }
        }
    }
    async findAll() {
        const tutors = await this.tutorModel.find().exec();
        return tutors;
    }
    async findOne(id) {
        let tutor;
        try {
            tutor = await this.tutorModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
        if (!tutor) {
            throw new common_1.NotFoundException();
        }
        return {
            id: tutor.id,
            username: tutor.username,
            email: tutor.email,
            balance: tutor.balance,
        };
    }
    async update(id, tutor) {
        let updatedTutor;
        try {
            updatedTutor = await this.tutorModel.findByIdAndUpdate(id, tutor, {
                new: true,
                runValidators: true,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
        if (!updatedTutor) {
            throw new common_1.NotFoundException();
        }
        return updatedTutor;
    }
    async remove(id) {
        const removedTutor = await this.tutorModel.findByIdAndRemove(id);
        return `Tutor with id: ${removedTutor.id} is removed`;
    }
    async findByEmail(email) {
        try {
            return await this.tutorModel.findOne({ email }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
};
exports.TutorService = TutorService;
exports.TutorService = TutorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tutor_schema_1.Tutor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TutorService);
//# sourceMappingURL=tutor.service.js.map