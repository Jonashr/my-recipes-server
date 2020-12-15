const recipesRouter = require('express').Router()
const pool = require('../db')


recipesRouter.get('/', async(_, response, next) => {
  try {
    const recipes = await pool.query('SELECT id, title, making_time, serves, ingredients, cost FROM recipes')
    return response.status(200).json({
      recipes: recipes.rows
    })

  } catch(error) {
    next(error)
  }
})

recipesRouter.get('/:id', async(request, response, next) => {
  const { id } = request.params

  try {
    const recipe = await pool.query(
      `SELECT id, title, making_time, serves, ingredients, cost 
       FROM recipes 
       WHERE id = ${id}`)

    if(recipe.rowCount === 0) {
      return response.status(404).json({ message: `Recipe with id ${id} was not found.` })
    }


    return response.status(200).json({
      message: 'Recipe details by id',
      recipe: recipe.rows[0]
    })
  } catch(error) {
    next(error)
  }
})

recipesRouter.post('/', async(request, response, next) => {
  const body = request.body

  try {
    const { title, making_time, serves, ingredients, cost } = body

    if(!title || !making_time || !serves || !ingredients || !cost) {
      response.status(400).json({
        message: 'Recipe creation failed',
        required: 'title, making_time, serves, ingredients, cost',
      })
    }

    const recipe = await pool.query(
      `INSERT INTO recipes (title, making_time, serves, ingredients, cost) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [title, making_time, serves, ingredients, cost])

    return response.status(201).json({
      message: 'Recipe succesfully created!',
      recipe: recipe.rows
    })

  } catch(error) {
    next(error)
  }
})

recipesRouter.patch('/:id', async(request, response, next) => {
  const body = request.body
  const { id } = request.params
  try {
    const { title, making_time, serves, ingredients, cost } = body
    const recipe = await pool.query(`SELECT * FROM recipes WHERE id = ${id}`)
    if(recipe.rowCount === 0) {
      return response.status(404).json({ message: `Recipe with id ${id} was not found.` })
    }

    if(!title && !making_time && !serves && !ingredients && !cost) {
      response.status(400).json({
        message: 'Recipe creation failed',
        required: 'title, making_time, serves, ingredients, cost',
      })
    }

    const updated_at = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()

    const updatedRecipe = await pool.query('UPDATE recipes SET title= $1, making_time = $2, serves = $3, ingredients = $4, cost = $5, updated_at = $6 WHERE id = $7 RETURNING *'
      , [title, making_time, serves, ingredients, cost, updated_at, id])

    return response.status(200).json({
      message: 'Recipe succesfully updated',
      recipe: updatedRecipe.rows[0]
    })

  } catch(error) {
    next(error)
  }

})

recipesRouter.delete('/:id', async(request, response, next) => {
  const { id } = request.params

  try {
    const recipe = await pool.query(`DELETE FROM recipes WHERE id = ${id}`)
    if(recipe.rowCount === 0) {
      return response.status(404).json({ message: 'No recipe found' })
    }

    return response.status(200).json({ message: 'Recipe succesfully removed!' })
  } catch(error) {
    next(error)
  }
})

module.exports = recipesRouter