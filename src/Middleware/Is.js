'use strict'

const AuthorizationException = require('../Exceptions')

class Is {
  async handle ({ imperium }, next, [role]) {
    if (await imperium.isnot(role)) throw AuthorizationException.invoke('Unauthorized', 401, 'E_UNAUTHORIZED')

    await next()
  }
}

module.exports = Is
