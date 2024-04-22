const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
require('../models')

const URL_BASE = '/api/v1/movies'
let movieId
const newMovie = {
  name: "Corpse Bride",
  image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Corpse_Bride_film_poster.jpg/220px-Corpse_Bride_film_poster.jpg",
  synopsis: "Resumen pelicula",
  releaseYear: 2005
}

test('POST -> URL_BASE should return statusCode 201, and res.body.name === newMovie.name', async () => {
  const res = await request(app)
    .post(URL_BASE)
    .send(newMovie)

  movieId = res.body.id

  expect(res.status).toBe(201)
  expect(res.status).toBeDefined()
  expect(res.body.name).toBe(newMovie.name)
})

test('GET -> URL_BASE, should return statusCode 200, and res.body.length === 1', async () => {
  const res = await request(app)
    .get(URL_BASE)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('PUT -> URL_BASE/movieId, should return statusCode 200, and res.body.name === bodyUpdate.name', async () => {
  const bodyUpdate = {
    name: 'BeetleJuice'
  }

  const res = await request(app)
    .put(`${URL_BASE}/${movieId}`)
    .send(bodyUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(bodyUpdate.name)
})

test('POST -> URL_BASE/movieId/actors, should return statusCode 200, and res.body.length === 1', async () => {
  const actor = await Actor.create({
    firstName: 'Johnny prueba',
    lastName: 'Deep prueba',
    nationality: 'American',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Johnny_Depp_2020.jpg',
    birthday: '1963-06-09'
  })

  const res = await request(app).post(`${URL_BASE}/${movieId}/actors`)
    .send([actor.id])

  await actor.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test('POST -> URL_BASE/movieId/directors should statusCode 200, and res.body.length === 1', async () => {
  const director = await Director.create({
    firstName: 'Guillermo',
    lastName: 'del Toro',
    nationality: 'Mexican',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Guillermo_del_Toro_2023_%28cropped%29.jpg/440px-Guillermo_del_Toro_2023_%28cropped%29.jpg',
    birthday: '1964-10-09'
  })

  const res = await request(app)
    .post(`${URL_BASE}/${movieId}/directors`)
    .send([director.id])

  expect(res.status).toBe(200)
  await director.destroy()
  expect(res.body).toHaveLength(1)
})

test('POST -> URL_BASE/movieId/genres should return statusCode 200, and res.body.length === 1', async () => {
  const genre = await Genre.create({
    name: 'horror'
  })

  const res = await request(app)
    .post(`${URL_BASE}/${movieId}/genres`)
    .send([genre.id])

  expect(res.status).toBe(200)
  await genre.destroy()
  expect(res.body).toHaveLength(1)
})

test('DELETE -> URL_BASE/movieId should return statusCode 204', async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${movieId}`)

  expect(res.status).toBe(204)
})
