"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncWrapper;
function asyncWrapper(middleware) {
  return (request, response, next) => {
    Promise.resolve(middleware(request, response, next)).catch(next);
  };
}