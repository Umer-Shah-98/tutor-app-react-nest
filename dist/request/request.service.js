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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const request_schema_1 = require("./schemas/request.schema");
const mongoose_2 = require("mongoose");
let RequestService = class RequestService {
    constructor(requestModel) {
        this.requestModel = requestModel;
    }
    async create(createRequestDto) {
        try {
            const request = await this.requestModel.create(createRequestDto);
            if (request) {
                return {
                    studentName: request.studentName,
                    email: request.email,
                    id: request.id,
                    class: request.class,
                    subject: request.subject,
                    details: request.details,
                    requestId: request._id,
                };
            }
            else {
                return false;
            }
        }
        catch (error) {
            return error;
        }
    }
    async findAll() {
        try {
            const requests = await this.requestModel.find().exec();
            return requests.map((request) => {
                return {
                    studentName: request.studentName,
                    email: request.email,
                    id: request.id,
                    class: request.class,
                    subject: request.subject,
                    details: request.details,
                    requestId: request._id,
                };
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAllRequestsForStudentId(id) {
        try {
            const requests = await this.requestModel.find().exec();
            const filteredRequests = requests.filter((request) => request.id.toString() === id);
            return filteredRequests.map((request) => {
                return {
                    studentName: request.studentName,
                    email: request.email,
                    id: request.id,
                    class: request.class,
                    subject: request.subject,
                    details: request.details,
                    requestId: request._id,
                };
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findOne(id) {
        try {
            const request = await this.requestModel.findById(id).populate('id');
            return request;
        }
        catch (error) {
            return error;
        }
    }
    update(id, updateRequestDto) {
        return `This action updates a #${id} request`;
    }
    async remove(id) {
        try {
            const removedRequest = await this.requestModel.findByIdAndRemove(id);
            const requests = await this.requestModel.find().exec();
            return requests.map((request) => {
                return {
                    studentName: request.studentName,
                    email: request.email,
                    id: request.id,
                    class: request.class,
                    subject: request.subject,
                    details: request.details,
                    requestId: request._id,
                };
            });
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
    async removeRequestOfStudent(id) {
        try {
            const removedRequest = await this.requestModel.findByIdAndRemove(id);
            return {
                studentName: removedRequest.studentName,
                email: removedRequest.email,
                id: removedRequest.id,
                class: removedRequest.class,
                subject: removedRequest.subject,
                details: removedRequest.details,
                requestId: removedRequest._id,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException();
        }
    }
};
exports.RequestService = RequestService;
exports.RequestService = RequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(request_schema_1.Request.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RequestService);
//# sourceMappingURL=request.service.js.map