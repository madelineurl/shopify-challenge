'use strict';

const { db, Movie } = require('./server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const movies = await Promise.all([
    Movie.create({title: 'Love Actually'}),
    Movie.create({title: 'Fern Gully' }),
    Movie.create({title: 'Home Alone' })
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
