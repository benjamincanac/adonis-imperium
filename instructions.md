## Registering provider

The provider is registered inside `start/app.js` file under `providers` array.

```js
const providers = [
  'adonis-imperium/providers/ImperiumProvider'
]
```

## Registering middleware

Add the middleware `Adonis/Middleware/ImperiumInit` in the `start/kernel.js` file in `globalMiddleware` array **after** `AuthInit`.

Add the middlewares `Adonis/Middleware/Is` and `Adonis/Middleware/Can` in the `start/kernel.js` file in `namedMiddleware` array.

```js
// start/kernel.js
const globalMiddleware = [
  ...
  'Adonis/Middleware/AuthInit',
  'Adonis/Middleware/ImperiumInit',
  ...
]

const namedMiddleware = {
  ...
  is: 'Adonis/Middleware/Is',
  can: 'Adonis/Middleware/Can'
  ...
}
```

## Loading acl.js

Add the `start/acl.js` file to your Ignitor starting script.

```js
// server.js

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .preLoad('start/acl')
  .fireHttpServer()
  .catch(console.error)
```
