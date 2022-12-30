export default function routeSanity (request, response, next) {
  request.isMatch = true
  process.nextTick(next)
}
