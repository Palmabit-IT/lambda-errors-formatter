'use strict'

const DEFAULT_CODE = 500
const DEFAULT_MESSAGE = 'Internal Server Error'

const setCode = (code, message) => {
  return {
    statusCode: code + '',
    body: JSON.stringify({message: message}),
    headers: {
      'Content-Type': 'application/json',
    }
  }
}

const badRequest = message => {
  return setCode(400, message)
}

const unauthorized = message => {
  return setCode(401, message)
}

const forbidden = message => {
  return setCode(403, message)
}

const notFound = message => {
  return setCode(404, message)
}

const conflict = message => {
  return setCode(409, message)
}

const internalServerError = message => {
  return setCode(500, message)
}

const error = err => {
  if (typeof err === 'string') {
    return internalServerError(err)

  } else if (typeof err === 'object') {
    return setCode((err.statusCode || DEFAULT_CODE), (err.message || DEFAULT_MESSAGE))
  }
}

module.exports = {
  setCode: setCode,
  badRequest: badRequest,
  unauthorized: unauthorized,
  forbidden: forbidden,
  notFound: notFound,
  conflict: conflict,
  internalServerError: internalServerError,
  error: error
}
