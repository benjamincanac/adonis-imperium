'use strict'

const AuthorizationException = require('../Exceptions')

class Is {
  async handle ({ imperium }, next, [role]) {
    if (await imperium.isnot(role)) throw new AuthorizationException('Unauthorized', 403, 'E_UNAUTHORIZED')

    await next()
  }

  async wsHandle ({ imperium }, next, [role]) {
    if (await imperium.isnot(role)) throw new AuthorizationException('Unauthorized', 403, 'E_UNAUTHORIZED')

    await next()
  }
}

module.exports = Is
