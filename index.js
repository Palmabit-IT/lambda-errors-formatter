'use strict'

const DEFAULT_CODE = 500
const DEFAULT_MESSAGE = 'Internal Server Error'

const BAD_REQUEST_MESSAGE = 'Bad request'
const UNAUTHORIZED_MESSAGE = 'Unauthorized'
const FORBIDDEN_MESSAGE = 'Forbidden'
const NOT_FOUND_MESSAGE = 'Not found'
const CONFLICT_MESSAGE = 'Conflict'

const formatCode = (code, message) => {
  if (typeof message === 'object') {
    return formatCodeAndError(code, message)
  }

  return {
    statusCode: code + '',
    body: JSON.stringify({message: message}),
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Content-Type': 'application/json'
    }
  }
}

const formatCodeAndError = (code, err) => {
  if (typeof err === 'string') {
    return formatCode(code, err)

  } else if (typeof err === 'object') {
    err = (!err || err === null) ? {} : err
    return formatCode(code, (getMessage(err) || DEFAULT_MESSAGE))
  }

  return internalServerError()
}

const badRequest = err => {
  return formatCodeAndError(400, err || BAD_REQUEST_MESSAGE)
}

const unauthorized = err => {
  return formatCodeAndError(401, err || UNAUTHORIZED_MESSAGE)
}

const forbidden = err => {
  return formatCodeAndError(403, err || FORBIDDEN_MESSAGE)
}

const notFound = err => {
  return formatCodeAndError(404, err || NOT_FOUND_MESSAGE)
}

const conflict = err => {
  return formatCodeAndError(409, err || CONFLICT_MESSAGE)
}

const internalServerError = err => {
  return formatCodeAndError(500, err || DEFAULT_MESSAGE)
}

const format = err => {
  if (typeof err === 'string') {
    return internalServerError(err)

  } else if (typeof err === 'object') {
    err = (!err || err === null) ? {} : err
    return formatCode((err.statusCode || DEFAULT_CODE), (getMessage(err) || DEFAULT_MESSAGE))
  }

  return internalServerError()
}

const getMessage = err => {
  err = err || {}

  if (typeof err.message !== 'undefined') {
    return err.message

  } else if (err.body) {
    return parseMessage(err.body)
  }

  return null
}

const parseMessage = body => {
  try {
    const parsed = JSON.parse(body)
    return parsed && parsed.message
  } catch (e) {
    return null
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
