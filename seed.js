'use strict';

const { db, Movie } = require('./server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const movies = await Promise.all([
    Movie.create({title: 'Love Actually', imdbID: 'tt0314331'}),
    Movie.create({title: 'Girls Trip', imdbID: 'tt3564472' }),
    Movie.create({title: 'Cabin in the Woods', imdbID: 'tt1259521' })
  ]);

  console.log(`seeded ${movies.length} movies`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

runSeed();
