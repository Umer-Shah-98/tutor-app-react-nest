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
exports.RequestController = void 0;
const common_1 = require("@nestjs/common");
const request_service_1 = require("./request.service");
const create_request_dto_1 = require("./dto/create-request.dto");
const update_request_dto_1 = require("./dto/update-request.dto");
let RequestController = class RequestController {
    constructor(requestService) {
        this.requestService = requestService;
    }
    async create(createRequestDto) {
        try {
            return this.requestService.create(createRequestDto);
        }
        catch (error) {
            return error;
        }
    }
    findAll() {
        return this.requestService.findAll();
    }
    async findAllRequestsForStudentId(id) {
        try {
            return await this.requestService.findAllRequestsForStudentId(id);
        }
        catch (error) { }
    }
    findOne(id) {
        return this.requestService.findOne(id);
    }
    update(id, updateRequestDto) {
        return this.requestService.update(+id, updateRequestDto);
    }
    async removeRequestOfStudent(id) {
        try {
            return this.requestService.removeRequestOfStudent(id);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async remove(id) {
        try {
            return this.requestService.remove(id);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.RequestController = RequestController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/find_all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "findAllRequestsForStudentId", null);
__decorate([
    (0, common_1.Get)('request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_request_dto_1.UpdateRequestDto]),
    __metadata("design:returntype", void 0)
], RequestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/student/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "removeRequestOfStudent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "remove", null);
exports.RequestController = RequestController = __decorate([
    (0, common_1.Controller)('requests'),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], RequestController);
//# sourceMappingURL=request.controller.js.map