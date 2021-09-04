import fs from 'fs';
import { dbConnect, dbDisconnect } from './config/mongoose.config.js';
import { Persona } from './models/index.js';


async function seed() {
  try {
    await dbConnect();

    const deleted = await Persona.deleteMany({});
    console.log(`Deleted ${deleted.n} personas.`);

    const data = fs.readFileSync(`${process.cwd()}/local/data.csv`).toString();
    const personas = data
        .split('\r\n')
        .map((line) => {
          const [stageName, city, instagram, pronouns] = line.split(',');
          return {
            stageName,
            city,
            instagram,
            pronouns,
          };
        });

    const res = await Persona.create(personas);
    console.log(`Created ${res.length} personas.`);
  } catch (error) {
    console.error(error);
  } finally {
    dbDisconnect();
  }
}

seed();
