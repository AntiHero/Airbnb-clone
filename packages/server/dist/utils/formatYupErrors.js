"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYupErrors = void 0;
exports.formatYupErrors = (err) => {
    const errors = [];
    err.inner.forEach((e) => {
        errors.push({ path: e.path, message: e.message });
    });
    return errors;
};
