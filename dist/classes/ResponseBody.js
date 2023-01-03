"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DEFAULT_ERROR_MSG = 'Unhandled Error';
var DEFAULT_ERROR_STATUS_CODE = 500;
var DEFAULT_ERROR_CODE = 'GENERIC_ERROR_CODE';
class ResponseBody {
  constructor(statusCode, message, data, error, errorCode) {
    this.statusCode = statusCode || DEFAULT_ERROR_STATUS_CODE;
    this.status = _http.default.STATUS_CODES[statusCode];
    this.message = message || DEFAULT_ERROR_MSG;
    this.data = data;
    this.error = error;
    this.errorCode = error && (errorCode || DEFAULT_ERROR_CODE);
  }
}
exports.default = ResponseBody;