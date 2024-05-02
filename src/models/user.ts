import { compare, hash } from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { server } from '..';

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
  },
  {
    methods: {
      async comparePassword(password: string) {
        if (!this.password) return false;
        return await compare(password, this.password);
      },
      async generateToken() {
        const token = server.jwt.sign({ id: this._id });
        return token;
      },
    },
    statics: {
      async isUniqueUsername(username: string) {
        return (await this.findOne({ username })) === null;
      },
      async isUniqueEmail(email: string) {
        return (await this.findOne({ email })) === null;
      },
      async hashPassword(password: string) {
        return await hash(password, 10);
      },
    },
  }
);

export const UserModel = model('User', UserSchema);
