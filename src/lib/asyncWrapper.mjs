export default function asyncWrapper (middleware) {
  return (request, response, next) => {
    Promise
      .resolve(middleware(request, response, next))
      .catch(next)
  }
}
