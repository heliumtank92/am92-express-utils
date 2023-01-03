"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _expressHttpContext = _interopRequireDefault(require("express-http-context"));
var _apiCrypto = _interopRequireDefault(require("@am92/api-crypto"));
var _asyncWrapper = _interopRequireDefault(require("../lib/asyncWrapper.js"));
var _routeSanity = _interopRequireDefault(require("./routeSanity.js"));
var _ResponseBody = _interopRequireDefault(require("../classes/ResponseBody.js"));
var _CONSTANTS = require("../CONSTANTS.js");
var _DEBUG = _interopRequireDefault(require("../DEBUG.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var DEFAULT_ROUTES = [{
  path: '/health',
  method: 'get',
  routePipeline: [_routeSanity.default, (0, _asyncWrapper.default)(healthHandler)]
}, {
  path: '/version',
  method: 'get',
  routePipeline: [_routeSanity.default, (0, _asyncWrapper.default)(versionHandler)]
}, {
  path: '/handshake',
  method: 'get',
  routePipeline: [_routeSanity.default, (0, _asyncWrapper.default)(handshakeHandler)]
}];
var _default = DEFAULT_ROUTES;
exports.default = _default;
function healthHandler(request, response, next) {
  response.body = new _ResponseBody.default(200, 'Health Check Succesful');
  return process.nextTick(next);
}
function versionHandler(request, response, next) {
  var {
    npm_package_name: name = '',
    npm_package_version: version = ''
  } = process.env;
  response.body = new _ResponseBody.default(200, 'Version Check Succesful', {
    name,
    version
  });
  return process.nextTick(next);
}
function handshakeHandler(_x, _x2, _x3) {
  return _handshakeHandler.apply(this, arguments);
}
function _handshakeHandler() {
  _handshakeHandler = _asyncToGenerator(function* (request, response, next) {
    var clientId = _expressHttpContext.default.get("headers.".concat(_CONSTANTS.CLIENT_ID_HEADER_KEY));
    var publicKey = _DEBUG.default.disableCrypto ? '' : yield _apiCrypto.default.getPublicKey(clientId);
    response.body = new _ResponseBody.default(200, 'Handshake Succesful', {
      publicKey
    });
    next();
  });
  return _handshakeHandler.apply(this, arguments);
}