"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBodyParams = void 0;
function parseBodyParams(params) {
    const PARSED_BODY = Object.entries(params).map(([key, value]) => {
        const handleReturning = (val) => ({ [key]: val });
        if (Array.isArray(value))
            return handleReturning(value.join(','));
        if (typeof value === 'object') {
            const ENTRIES = Object.entries(value);
            const PARSED_OBJECT = ENTRIES.map(([key, value]) => `${key}=${value}`).join('&');
            return handleReturning(PARSED_OBJECT);
        }
        return handleReturning(value);
    });
    return Object.assign({}, ...PARSED_BODY);
}
exports.parseBodyParams = parseBodyParams;
