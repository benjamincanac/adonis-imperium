'use strict'

const AuthorizationException = require('../Exceptions')

const Config = use('Config')

class Can {
  async handle ({ imperium, params, request }, next, [action]) {
    let actionParams
    // https://github.com/adonisjs/adonis-framework/issues/230#issuecomment-237004946
    const actionParamsResolver = Config.get(`acl.${action}`)

    if (actionParamsResolver) actionParams = await actionParamsResolver({ params, request })

    if (await imperium.cannot(action, actionParams)) throw new AuthorizationException('Unauthorized', 401, 'E_UNAUTHORIZED')

    await next()
  }

  async wsHandle ({ imperium }, next, [action]) {
    if (await imperium.cannot(action)) throw new AuthorizationException('Unauthorized', 401, 'E_UNAUTHORIZED')

    await next()
  }
}

module.exports = Can
