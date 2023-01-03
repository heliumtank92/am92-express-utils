"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONSTANTS = void 0;
Object.defineProperty(exports, "CustomError", {
  enumerable: true,
  get: function get() {
    return _CustomError.default;
  }
});
Object.defineProperty(exports, "ResponseBody", {
  enumerable: true,
  get: function get() {
    return _ResponseBody.default;
  }
});
Object.defineProperty(exports, "asyncWrapper", {
  enumerable: true,
  get: function get() {
    return _asyncWrapper.default;
  }
});
Object.defineProperty(exports, "configureRouter", {
  enumerable: true,
  get: function get() {
    return _configureRouter.default;
  }
});
Object.defineProperty(exports, "httpContext", {
  enumerable: true,
  get: function get() {
    return _httpContext.default;
  }
});
Object.defineProperty(exports, "initializeRoutes", {
  enumerable: true,
  get: function get() {
    return _initializeRoutes.default;
  }
});
var _initializeRoutes = _interopRequireDefault(require("./lib/initializeRoutes.js"));
var _configureRouter = _interopRequireDefault(require("./lib/configureRouter.js"));
var _asyncWrapper = _interopRequireDefault(require("./lib/asyncWrapper.js"));
var _httpContext = _interopRequireDefault(require("./lib/httpContext.js"));
var _CustomError = _interopRequireDefault(require("./classes/CustomError.js"));
var _ResponseBody = _interopRequireDefault(require("./classes/ResponseBody.js"));
var CONSTANTS = _interopRequireWildcard(require("./CONSTANTS.js"));
exports.CONSTANTS = CONSTANTS;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }