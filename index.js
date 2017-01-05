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

const formatCodeAndError = (code, err) => {
  if (typeof err === 'string') {
    return formatCode(code, err)

  } else if (typeof err === 'object') {
    return formatCode(code, (err.message || DEFAULT_MESSAGE))
  }
}

const badRequest = err => {
  return formatCodeAndError(400, err)
}

const unauthorized = err => {
  return formatCodeAndError(401, err)
}

const forbidden = err => {
  return formatCodeAndError(403, err)
}

const notFound = err => {
  return formatCodeAndError(404, err)
}

const conflict = err => {
  return formatCodeAndError(409, err)
}

const internalServerError = err => {
  return formatCodeAndError(500, err)
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
  formatCodeAndError: formatCodeAndError,
  badRequest: badRequest,
  unauthorized: unauthorized,
  forbidden: forbidden,
  notFound: notFound,
  conflict: conflict,
  internalServerError: internalServerError,
  format: format
}
