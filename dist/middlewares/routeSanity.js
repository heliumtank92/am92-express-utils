"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routeSanity;
function routeSanity(request, response, next) {
  request.isMatch = true;
  process.nextTick(next);
}