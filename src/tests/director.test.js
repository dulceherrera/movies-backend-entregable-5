const request = require('supertest')
const app = require('../app')

const URL_BASE = '/api/v1/directors'
const newDirector = {
  firstName: 'Tim',
  lastName: 'Burton',
  nationality: 'American',
  image: 'https://cdn.britannica.com/11/153011-050-A3165C6D/Tim-Burton-2010.jpg',
  birthday: '1958-08-25'
}
let directorId

test('POST-> URL_BASE, should return statusCode 201, and res.body.firstName === newDirector.firstName', async () => {
  const res = await request(app)
    .post(URL_BASE)
    .send(newDirector)

  directorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.status).toBeDefined()
  expect(res.body.firstName).toBe(newDirector.firstName)
})

test('GET -> URL_BASE, should return statusCode 200, and res.body.length === 1', async () => {
  const res = await request(app)
    .get(URL_BASE)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('PUT -> URL_BASE/:id, should return statusCode 200, and res.body.firstName === bodyUpdate.firstName', async () => {
  const bodyUpdate = {
    firstName: 'Director actualizado'
  }

  const res = await request(app)
    .put(`${URL_BASE}/${directorId}`)
    .send(bodyUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(bodyUpdate.firstName)
})

test("DELETE -> URL_BASE/:id, should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${directorId}`)

  expect(res.status).toBe(204)
})
