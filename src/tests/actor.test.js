const request = require('supertest')
const app = require('../app')

const URL_BASE = '/api/v1/actors'

const newActor = {
  firstName: 'Meryl prueba',
  lastName: 'Streep prueba',
  nationality: 'American',
  image: 'https://cdn.britannica.com/49/137449-050-6F351130/Meryl-Streep-The-Devil-Wears-Prada.jpg',
  birthday: '1949-06-22'
}

let actorId

test('POST -> URL_BASE, should return statusCode 201, and res.body.firstName === newActor.firstName', async() => {

  const res = await request(app)
  .post(URL_BASE)
  .send(newActor)
  actorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(newActor.firstName)
})

test("GET -> URL_BASE, should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app).get(URL_BASE)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('PUT -> URL_BASE/:id, should return statusCode 200, and res.body.birthday === bodyUpdate.birthday', async () => {
  const bodyUpdate = {
    birthday: '1950-04-23'
  }

  const res = await request(app)
    .put(`${URL_BASE}/${actorId}`)
    .send(bodyUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.birthday).toBe(bodyUpdate.birthday)
})

test("DELETE -> URL_BASE/:id, should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${actorId}`)

  expect(res.status).toBe(204)
})
