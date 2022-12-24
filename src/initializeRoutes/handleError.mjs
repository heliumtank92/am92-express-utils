import handleResponse from './handleResponse.mjs'

export default function handleError (error, request, response, next) {
  if (!error) { return process.nextTick(next) }
  response.error = error
  handleResponse(request, response, next)
}
