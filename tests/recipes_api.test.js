const supertest = require('supertest')
const pool = require('../db')
const app = require('../app')
const api = supertest(app)

const initialRecipes = [
  {
    id: 1,
    title: 'チキンカレー',
    making_time: '45分',
    serves: '4人',
    ingredients: '玉ねぎ,肉,スパイス',
    cost: 1000
  },
  {
    title: 'オムライス',
    making_time: '30分',
    serves: '2人',
    ingredients:'玉ねぎ,卵,スパイス,醤油',
    cost: 700
  }
]

let savedRecipeId

beforeEach(async() => {
  await pool.query('DELETE FROM recipes')

  for(let recipe of initialRecipes) {
    const createdRecipe = await pool.query(
      `INSERT INTO recipes (title, making_time, serves, ingredients, cost) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [recipe.title, recipe.making_time, recipe.serves, recipe.ingredients, recipe.cost])
    savedRecipeId = createdRecipe.rows[0].id
  }

})

describe('When there are initially two recipes', () => {

  // eslint-disable-next-line no-useless-escape
  test('GET - Recipes are returned as application\/json format', async () => {
    await api
      .get('/recipes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('GET/recipes returns the length of initial recipes', async () => {
    const recipes = await api.get('/recipes')
    expect(recipes.body.recipes.length).toBe(initialRecipes.length)
  })

  test('GET/recipes/:id - Valid ID returns id, title, making_time, serves, ingredients, cost, but NOT created_at, updated_at', async () => {
    const response = await api
      .get(`/recipes/${savedRecipeId}`)
      .expect(200)

    const { id, title, making_time, serves, ingredients, cost, created_at, updated_at } = response.body.recipe

    expect(id).toBeDefined()
    expect(title).toBeDefined()
    expect(making_time).toBeDefined()
    expect(serves).toBeDefined()
    expect(ingredients).toBeDefined()
    expect(cost).toBeDefined()

    expect(created_at).toBeUndefined()
    expect(updated_at).toBeUndefined()
  })

  test('POST - A valid recipe can be added', async() => {
    const validRecipe = {
      title: 'Chicken Salad',
      making_time: '30 Minutes',
      serves: '2',
      ingredients: 'Chicken, avocado, lettuce',
      cost: 500
    }

    await api
      .post('/recipes')
      .send(validRecipe)
      .expect(201)

    const response = await api.get('/recipes')
    expect(response.body.recipes.length).toBe(initialRecipes.length + 1)
  })

  test('POST - A recipe without a title returns a 400 - BAD REQUEST ERROR', async() => {
    const invalidRecipe = {
      making_time: '30 minutes',
      serves: '1',
      ingredients: 'Broccoli, roast beef, dressing',
      cost: 450
    }

    await api
      .post('/recipes')
      .send(invalidRecipe)
      .expect(400)
  })

  test('DELETE - A recipe with an invalid id returns 404 - NOT FOUND and an appropriate error message', async () => {
    const response = await api
      .delete('/recipes/54')
      .expect(404)

    expect(response.body.message).toBe('No recipe found')
  })

  test('DELETE - A recipe with an id that exists return status 200 and an appropriate message', async() => {
    const response = await api
      .delete(`/recipes/${savedRecipeId}`)
      .expect(200)

    expect(response.body.message).toBe('Recipe succesfully removed!')
  })
})

afterAll(async() => {
  await pool.end()
})



