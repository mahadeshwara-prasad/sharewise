import { Schema, model, models } from 'mongoose';

const usersSchema = new Schema({
  name: String,
});

const Users = model('Test', usersSchema);

export default Users;