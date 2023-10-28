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
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const proposal_service_1 = require("./proposal.service");
const create_proposal_dto_1 = require("./dto/create-proposal.dto");
const update_proposal_dto_1 = require("./dto/update-proposal.dto");
let ProposalController = class ProposalController {
    constructor(proposalService) {
        this.proposalService = proposalService;
    }
    async findAllAcceptedAdmin() {
        try {
            const proposals = await this.proposalService.findAllAcceptedAdmin();
            return proposals;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllRejectedAdmin() {
        try {
            const proposals = await this.proposalService.findAllRejectedAdmin();
            return proposals;
        }
        catch (error) {
            throw error;
        }
    }
    findOne(id) {
        return this.proposalService.findOne(id);
    }
    findAllAccepted(id) {
        return this.proposalService.findAllAccepted(id);
    }
    findAllRejected(id) {
        return this.proposalService.findAllRejected(id);
    }
    findAll() {
        return this.proposalService.findAll();
    }
    async create(createProposalDto) {
        try {
            return this.proposalService.create(createProposalDto);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async update(id, updateProposalDto) {
        try {
            return this.proposalService.update(id, updateProposalDto);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async deleteProposals(query) {
        if (!query || Object.keys(query).length === 0) {
            throw new common_1.BadRequestException('Invalid query');
        }
        const result = await this.proposalService.deleteMany(query);
        if (result.deletedCount > 0) {
            return { message: 'Proposals deleted successfully' };
        }
        else {
            return { message: 'No matching proposals found for deletion' };
        }
    }
    async remove(id) {
        try {
            return this.proposalService.remove(id);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.ProposalController = ProposalController;
__decorate([
    (0, common_1.Get)('/final'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findAllAcceptedAdmin", null);
__decorate([
    (0, common_1.Get)('/rejected/admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findAllRejectedAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('accepted/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findAllAccepted", null);
__decorate([
    (0, common_1.Get)('rejected/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findAllRejected", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProposalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proposal_dto_1.CreateProposalDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_proposal_dto_1.UpdateProposalDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/deleteAllProposals'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "deleteProposals", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "remove", null);
exports.ProposalController = ProposalController = __decorate([
    (0, common_1.Controller)('proposals'),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService])
], ProposalController);
//# sourceMappingURL=proposal.controller.js.map