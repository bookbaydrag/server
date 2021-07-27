import fs from 'fs';
import { dbConnect, dbDisconnect } from './config/mongoose.config.js';
import { Person } from './models/index.js';


async function seed() {
  try {
    await dbConnect();

    const deleted = await Person.deleteMany({});
    console.log(`Deleted ${deleted.n} persons.`);

    const data = fs.readFileSync(`${process.cwd()}/local/data.csv`).toString();
    const performers = data
        .split('\r\n')
        .map((line) => {
          const [dragName, city, instagram, pronouns] = line.split(',');
          return {
            dragName,
            city,
            instagram,
            pronouns,
          };
        });

    const res = await Person.create(performers);
    console.log(`Created ${res.length} persons.`);
  } catch (error) {
    console.error(error);
  } finally {
    dbDisconnect();
  }
}

seed();
