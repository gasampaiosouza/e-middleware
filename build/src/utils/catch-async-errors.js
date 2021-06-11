"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = void 0;
function catchAsyncErrors(actions) {
    const protectedActions = {};
    Object.keys(actions).forEach((property) => {
        protectedActions[property] = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield actions[property](req, res, next);
                }
                catch (error) {
                    if (error.hasOwnProperty('toJSON')) {
                        console.log(error.toJSON());
                    }
                    else {
                        console.log(error);
                    }
                    next(error);
                }
            });
        };
    });
    return protectedActions;
}
exports.catchAsyncErrors = catchAsyncErrors;
