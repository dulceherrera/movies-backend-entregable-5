const request = require('supertest')
const app = require('../app')

const URL_BASE = '/api/v1/genres'
const newGenre = {name : 'comedy'}
let genreId

test('POST -> URL_BASE, should return statusCode 201, and res.body.name === newGenre.name', async () => {
  const res = await request(app)
    .post(URL_BASE)
    .send(newGenre)

  genreId = res.body.id

  expect(res.status).toBe(201)
  expect(res.status).toBeDefined()
  expect(res.body.name).toBe(newGenre.name)
})

test('GET -> URL_BASE, should return statusCode 200, and res.body.length === 1', async () => {
  const res = await request(app)
    .get(URL_BASE)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('PUT -> URL_BASE/genreId, should return statusCode 200, and res.body.name === bodyUpdate.name', async () => {
  const bodyUpdate = {
    name: 'comedia actualizado'
  }

  const res = await request(app)
    .put(`${URL_BASE}/${genreId}`)
    .send(bodyUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(bodyUpdate.name)
})

test("DELETE -> URL_BASE/genreId, should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${genreId}`)

  expect(res.status).toBe(204)
})
