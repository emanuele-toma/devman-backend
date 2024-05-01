import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
  first_name: String,
  last_name: String,
  password: String,
  active: Boolean,
});

export const UserModel = model('User', UserSchema);
