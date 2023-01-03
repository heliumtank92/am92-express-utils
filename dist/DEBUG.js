"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var {
  DEBUG: debug
} = process.env;
var DEBUG_ID = 'expressUtils';
var debugAll = debug === '*' || (debug === null || debug === void 0 ? void 0 : debug.includes("".concat(DEBUG_ID, ":*")));
var debugFeatures = new RegExp("".concat(DEBUG_ID, ":([A-Za-z0-9,]*);?")).exec(debug);
var debugFeaturesList = debugFeatures && debugFeatures[1] || [];
var DEBUG = {
  disableCrypto: false
};
var DEBUG_FEATURES = Object.keys(DEBUG);
for (var feature of DEBUG_FEATURES) {
  var debugFeature = debugFeaturesList.includes(feature);
  DEBUG[feature] = debugAll || debugFeature;
}
var _default = DEBUG;
exports.default = _default;