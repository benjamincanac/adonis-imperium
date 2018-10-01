# Adonis Imperium 🦅

This package is an **authorization provider** built on top of [imperium](https://github.com/mono-js/imperium).

## Getting Started

Install the package using the `adonis` CLI.

```bash
> adonis install adonis-imperium
```

Follow instruction that are displayed ([or read them here](https://github.com/cmty/adonis-imperium/blob/master/instructions.md)).

## Defining your authorization

Authorization must be defined inside the `start/acl.js` file. This file will be loaded only once when the server is launch.

### Roles

Define the different roles of your applications.

Use `Imperium.role('...', (ctx) => {})` to create a role.

The function will be used to determine if your user has the role (it can be `asynchronous` by returning a `Promise`).

For example, you can get your user from your database and return:

- a `Boolean` (`true` if user has the corresponding role, otherwise `false`)
- an `Object` to compare against route actions
- an `Array` of objects

```js
const Imperium = use('Imperium')

Imperium.role('Admin', ({ auth }) => {
  return auth.user.role === 'admin'
})

Imperium.role('User', async ({ auth }) => {
  return { user: auth.user.id }
})
```

When returning an `object`, the keys will be compared against user actions params.

### Actions

Use `imperium.role('...')` to get a role, and use `can` or `is` methods to give actions or inheritance from another role.

### `can(actionName, [params])`

Define a user action with its params to match against.

```js
Imperium.role('User')
  .can('updateUser', { user: '@' })
```

### `is(roleName, [params])`

Inherit role's actions and overwrite its params.

```js
Imperium.role('Admin')
  .is('User', { user: '*' }) // '*' means all, so admin can see and manage all users
```

## Usage

Adonis Imperium automaticaly share an instance of the `imperium` instance in the context of each request.
To validate the authorization of a user you simply need to extract it from the context.

```js
// Controller
async show ({ imperium, params }) {
  const post = await Post.find(params.id)

  const can = await imperium.can('showPost', { post: params.id })

  if (!can) {
    // abort 401
  }

  // ...
}
```

```js
// RouteValidator
async authorize () {
  const { imperium, params } = this.ctx

  const can = await imperium.can('showPost', { post: params.id })

  if (!can) {
    // abort 401
  }

  // ...
}
```

### Middleware

You can also use the middlewares `is` and `can` in your routes.

```js
Route.get('/admin/posts', 'Admin/PostController.index')
  .middleware(['auth', 'is:Admin'])

Route.get('/admin/posts', 'Admin/PostController.show')
  .middleware(['auth', 'can:showPost'])
```

**Public API**

```js
imperium.can('Action', resource)
imperium.cannot('Action', resource)
imperium.is('Role')
imperium.isnot('Role')
```
