'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('todo/create', 'TodoController.create').as('todo.create')

Route.post('todo.store', 'TodoController.store').as('todo.store').validator('StoreTodo')
Route.put('todo/update/:id', 'TodoController.update').as('todo.update')
Route.get('todo', 'TodoController.index').as('todo')
Route.get('todo/edit/:id', 'TodoController.edit').as('todo.edit')
Route.get('todo/delete/:id', 'TodoController.destroy').as('todo.delete')
