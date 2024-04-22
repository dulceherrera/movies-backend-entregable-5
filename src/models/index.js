const Movie = require('./Movie')
const Genre = require('./Genre')
const Actor = require('./Actor')
const Director = require('./Director')

Movie.belongsToMany(Actor, { through: 'moviesActors' })
Actor.belongsToMany(Movie, { through: 'moviesActors' })

Movie.belongsToMany(Director, { through: 'moviesDirectors' })
Director.belongsToMany(Movie, { through: 'moviesDirectors' })

Genre.belongsToMany(Movie, { through: 'moviesGenres' })
Movie.belongsToMany(Genre, { through: 'moviesGenres' })
