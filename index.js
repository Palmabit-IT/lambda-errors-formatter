'use strict'

const DEFAULT_CODE = 500
const DEFAULT_MESSAGE = 'Internal Server Error'

const formatCode = (code, message) => {
  return {
    statusCode: code + '',
    message: message,
    body: JSON.stringify({message: message}),
    headers: {
      'Content-Type': 'application/json',
    }
  }
}

const badRequest = message => {
  return formatCode(400, message)
}

const unauthorized = message => {
  return formatCode(401, message)
}

const forbidden = message => {
  return formatCode(403, message)
}

const notFound = message => {
  return formatCode(404, message)
}

const conflict = message => {
  return formatCode(409, message)
}

const internalServerError = message => {
  return formatCode(500, message)
}

const format = err => {
  if (typeof err === 'string') {
    return internalServerError(err)

  } else if (typeof err === 'object') {
    return formatCode((err.statusCode || DEFAULT_CODE), (err.message || DEFAULT_MESSAGE))
  }
}

module.exports = {
  formatCode: formatCode,
  badRequest: badRequest,
  unauthorized: unauthorized,
  forbidden: forbidden,
  notFound: notFound,
  conflict: conflict,
  internalServerError: internalServerError,
  format: format
}
