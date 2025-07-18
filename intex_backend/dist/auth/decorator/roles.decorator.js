"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDec = exports.role_key = void 0;
const common_1 = require("@nestjs/common");
exports.role_key = 'roles';
const RoleDec = (...roles) => (0, common_1.SetMetadata)(exports.role_key, roles);
exports.RoleDec = RoleDec;
//# sourceMappingURL=roles.decorator.js.map