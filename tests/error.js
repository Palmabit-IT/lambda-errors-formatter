'use strict'

const chai = require('chai')
const expect = chai.expect
const faker = require('faker')

const formatter = require('../index')

describe('Error formatter', () => {
  let fakeCode, fakeError

  beforeEach(done => {
    fakeCode = faker.random.number()
    fakeError = faker.lorem.word()
    done()
  })

  it('should get formatted error with custom code', done => {
    expect(formatter.formatCode(fakeCode, fakeError)).to.deep.equal({
      statusCode: fakeCode.toString(),
      body: JSON.stringify({message: fakeError}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    done()
  })

  it('should call bad request function', done => {
    expect(formatter.badRequest(fakeError).statusCode).to.equal('400')
    expect(formatter.badRequest(fakeError).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call unauthorized function', done => {
    expect(formatter.unauthorized(fakeError).statusCode).to.equal('401')
    expect(formatter.unauthorized(fakeError).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call forbidden function', done => {
    expect(formatter.forbidden(fakeError).statusCode).to.equal('403')
    expect(formatter.forbidden(fakeError).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call not found function', done => {
    expect(formatter.notFound(fakeError).statusCode).to.equal('404')
    expect(formatter.notFound(fakeError).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call conflict function', done => {
    expect(formatter.conflict(fakeError).statusCode).to.equal('409')
    expect(formatter.conflict(fakeError).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call internal server error function', done => {
    expect(formatter.internalServerError(fakeError).statusCode).to.equal('500')
    expect(formatter.internalServerError(fakeError).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call generic error function with string', done => {
    expect(formatter.format(fakeError).statusCode).to.equal('500')
    expect(formatter.format(fakeError).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call generic error function with object', done => {
    const error = {
      statusCode: fakeCode,
      message: fakeError
    }

    expect(formatter.format(error).statusCode).to.equal(fakeCode.toString())
    expect(formatter.format(error).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call generic error function without code', done => {
    const error = {
      message: fakeError
    }

    expect(formatter.format(error).statusCode).to.equal('500')
    expect(formatter.format(error).body).to.equal(JSON.stringify({message: fakeError}))
    done()
  })

  it('should call generic error function without message', done => {
    const error = {
      statusCode: fakeCode
    }

    expect(formatter.format(error).statusCode).to.equal(fakeCode.toString())
    expect(formatter.format(error).body).to.equal(JSON.stringify({message: 'Internal Server Error'}))
    done()
  })
})