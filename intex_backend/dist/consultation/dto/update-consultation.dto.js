"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConsultationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_consultation_dto_1 = require("./create-consultation.dto");
class UpdateConsultationDto extends (0, swagger_1.PartialType)(create_consultation_dto_1.CreateConsultationDto) {
}
exports.UpdateConsultationDto = UpdateConsultationDto;
//# sourceMappingURL=update-consultation.dto.js.map