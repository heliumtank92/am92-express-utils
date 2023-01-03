"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleError;
var _apiCrypto = _interopRequireDefault(require("@am92/api-crypto"));
var _httpContext = _interopRequireDefault(require("../lib/httpContext.js"));
var _handleResponse = _interopRequireDefault(require("./handleResponse.js"));
var _ResponseBody = _interopRequireDefault(require("../classes/ResponseBody.js"));
var _CustomError = _interopRequireDefault(require("../classes/CustomError.js"));
var _CONSTANTS = require("../CONSTANTS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function handleError(piplelineError, request, response, next) {
  if (!piplelineError) {
    return process.nextTick(next);
  }

  // Handle ResponseBody
  if (piplelineError.constructor.name === _ResponseBody.default.name) {
    response.body = piplelineError;
    response.isError = true;
  } else {
    // Handle Any Other Error
    var customError = new _CustomError.default(piplelineError);
    var {
      statusCode,
      message,
      data,
      error,
      errorCode
    } = customError;
    response.body = new _ResponseBody.default(statusCode, message, data, error, errorCode);
    response.isError = true;
  }

  // Encrypt if Key Encryption Key Exists
  var plaintextKey = _httpContext.default.get("headers.".concat(_CONSTANTS.ENCRYPTION_KEY_HEADER_KEY));
  if (plaintextKey) {
    var bodyString = JSON.stringify(response.body);
    var encryptedPayload = _apiCrypto.default.encryptData(bodyString, plaintextKey);
    response.encryptedBody = {
      payload: encryptedPayload
    };
  }
  (0, _handleResponse.default)(request, response, next);
}