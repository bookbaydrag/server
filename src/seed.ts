// import { dbConnect, dbDisconnect } from './config/mongoose.config.js';
// import { Persona } from './models/index.js';
// import seedJSON from '../local/seed.json';
// import { Account, BaseAccount } from './models/account.model.js';

// type SeedData = {
//   accounts: BaseAccount[]
// }

// async function seed() {
//   try {
//     const seedData: SeedData = seedJSON;

//     const db = await dbConnect();
//     await db.connection.dropDatabase();

//     seedData.accounts.forEach((account)=>{
//       const personas = account.personas;
//       delete account.personas;

//       const newAccount = await Account.create(account);

//       personas?.forEach((persona)=>{
//         const personaData = {
//           ...persona,
//           newAccount._id,
//         };

//         const newPersona = await Persona.create(persona);

//         await Account.findByIdAndUpdate(
//           newAccount._id,
//           {
//             $push: {
//               personas: newPersona._id,
//             },
//           },
//       );

//       });
//     });
//   } catch (error) {
//     console.error(error);
//   } finally {
//     dbDisconnect();
//   }
// }

// seed();
