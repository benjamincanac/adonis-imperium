'use strict'

const { RuntimeException } = require('@adonisjs/generic-exceptions')

class AuthorizationException extends RuntimeException { }

module.exports = AuthorizationException
