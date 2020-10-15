'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with todos
 */
const { validate  } = use('Validator')
const Database = use('Database')

class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const allUsers = await Database.select('*').from('todos')

    	return view.render('Todo.index', {allUsers: allUsers})

  }

  /**
   * Render a form to be used for creating a new todo.
   * GET todos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('Todo.create')
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,session }) {

       const rules = {
      title: 'required',
    }

    const validation = await validate(request.only('title'), rules)

    if (validation.fails()) {
      session.withErrors(validation.messages())
       return response.redirect('back')
    }
    
    const data = request.only('title')


    const userId = await Database.table('todos').insert(data)
    userId ? session.flash({ success: 'Data insert successfully' })
    :session.flash({ error: 'sometimes error' })
    
    return response.redirect('back')
  }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing todo.
   * GET todos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const data = await Database.from('todos').where({ id: params.id })
    return view.render('Todo.edit',{data:data})
  }

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response,session }) {
    const affectedRows = await Database
      .table('todos')
      .where('id', params.id)
      .update(request.only('title'))

      affectedRows ? session.flash({ success: 'Update successfully' })
    :session.flash({ error: 'sometimes error' })
    
    return response.redirect('back')
  }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,session }) {

    const affectedRows = await Database
      .table('todos')
      .where('id', params.id)
      .delete()

      
      affectedRows ? session.flash({ success: 'Data delete successfully' })
    :session.flash({ error: 'sometimes error' })
    
    return response.redirect('back')
  }
}

module.exports = TodoController
