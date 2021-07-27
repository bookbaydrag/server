import fs from 'fs';
import { Person } from './svr/models/person.model';
import * as db from './srv/config/mongoose.config.js';

async function seed() {
    const deleted = Person.deleteMany({});
    const data = fs.readFileSync(`${process.cwd()}/data.csv`).toString();
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


}

seed();