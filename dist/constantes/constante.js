"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsAsync = exports.unlinkAsync = exports.pathUploads = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("util");
exports.pathUploads = (0, path_1.resolve)('./uploads');
exports.unlinkAsync = (0, util_1.promisify)(fs_1.unlinkSync);
exports.existsAsync = fs_1.existsSync;
//# sourceMappingURL=constante.js.map