"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ltDate = exports.gteDate = void 0;
const gteDate = (date) => new Date(date).toISOString();
exports.gteDate = gteDate;
const ltDate = (date) => new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toISOString();
exports.ltDate = ltDate;
//# sourceMappingURL=date.js.map