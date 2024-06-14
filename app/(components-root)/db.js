// import { connect, Schema, model} from 'mongoose';

// /**
//  * @param {import('next').NextApiRequest} req
//  * @param {import('next').NextApiResponse} res
//  */

// async function addTest(req, res) {
        
//   try {
//     console.log('CONNECTING TO MONGO');
//     const connectMongo = async () => await connect("mongodb://localhost:27017/myDb",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('CONNECTED TO MONGO');
//     const usersSchema = new Schema({
//       name: String,
//     });
//     const Users = model('Test', usersSchema);
    

//     console.log('CREATING DOCUMENT');
//     const test = await Users.create(req.body);
//     console.log('CREATED DOCUMENT');
//     res.json({ test });
//     console.log(res);

//   //   console.log('CREATING DOCUMENT');
//   //   const test = await Users.create(req.body);
//   //   console.log('CREATED DOCUMENT');
//   //   console.log(test);
//     //res.json({ test });
//   } catch (error) {
//     console.log(error);
//     //res.json({ error });
//   }
// }

// addTest();

import pg from "pg";
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "sharewise",
  password: "Madappa@12345",
  port: 5432,
});
//get all merchants our database


export default {
  query: (text, params) => pool.query(text, params),
};