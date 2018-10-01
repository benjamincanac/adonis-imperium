'use strict'

const Imperium = use('Imperium')

class ImperiumInit {
  async handle (ctx, next) {
    // Add imperium in the context
    ctx.imperium = Imperium.door(ctx)

    await next()
  }
}

module.exports = ImperiumInit
