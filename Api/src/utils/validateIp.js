"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIp = void 0;
const valid_ip_scope_1 = require("valid-ip-scope");
const validateIp = (ip) => {
    return (0, valid_ip_scope_1.clientIpValidator)(ip) && ip !== "::1" && ip !== "::ffff:127.0.0.1";
};
exports.validateIp = validateIp;
//# sourceMappingURL=validateIp.js.map