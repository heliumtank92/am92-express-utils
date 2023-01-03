"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiLogging;
var _apiLogger = require("@am92/api-logger");
function apiLogging(request, response, next) {
  request.timestamp = Date.now();
  response.on('finish', () => {
    var logMeta = _buildLogMeta(request, response);
    var logLevel = _getLogLevel(logMeta.res.statusCode);
    _apiLogger.httpLogger[logLevel](logMeta);
  });
  process.nextTick(next);
}
function _buildLogMeta(req, res) {
  var {
    httpVersionMajor,
    httpVersionMinor,
    ipAddress,
    _remoteAddress,
    connection: {
      remoteAddress
    } = {},
    originalUrl,
    url,
    method,
    headers: reqHeaders,
    body: reqBody = {}
  } = req;
  var httpVersion = "".concat(httpVersionMajor, ".").concat(httpVersionMinor);
  var requestIp = ipAddress || _remoteAddress || remoteAddress || '';
  var requestUrl = originalUrl || url;
  var timestamp = Date.now();
  var responseTime = req.timestamp ? timestamp - req.timestamp : -1;
  var {
    statusCode,
    statusMessage: status,
    body: resBody = {}
  } = res;
  var responseMessage = resBody.message || '';
  var resHeaders = res.getHeaders();
  var message = "[HTTP/".concat(httpVersion, "] ").concat(method, " ").concat(requestUrl, " | ").concat(statusCode, " ").concat(status, " | ").concat(responseMessage, " ").concat(responseTime, "ms");
  var logMeta = {
    type: 'REQ_RES_LOG',
    message,
    req: {
      httpVersion,
      ipAddress: requestIp,
      url: requestUrl,
      method,
      headers: reqHeaders,
      body: reqBody
    },
    res: {
      statusCode,
      status,
      headers: resHeaders,
      body: resBody,
      responseMessage,
      responseTime
    }
  };
  return logMeta;
}
function _getLogLevel(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return 'success';
  }
  if (statusCode >= 300 && statusCode < 400) {
    return 'info';
  }
  return 'error';
}