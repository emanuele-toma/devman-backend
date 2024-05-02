import { FastifyReply } from 'fastify';
import { UserModel } from '../../models';
import { LoginRequest, RegisterRequest } from './types';

export const authControllers = {
  login: async (req: LoginRequest, res: FastifyReply) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ email: username }, { username }],
    });

    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    if (!user.active) {
      return res.status(401).send({ message: 'User is not active' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    return res.status(200).send({ message: 'Logged in', token: await user.generateToken() });
  },
  register: async (req: RegisterRequest, res: FastifyReply) => {
    const { username, email, password, first_name, last_name } = req.body;

    if (!(await UserModel.isUniqueUsername(username))) {
      return res.status(401).send({ message: 'Username is already taken' });
    }

    if (!(await UserModel.isUniqueEmail(email))) {
      return res.status(401).send({ message: 'Email is already taken' });
    }

    const user = new UserModel({
      username,
      email,
      password: await UserModel.hashPassword(password),
      first_name,
      last_name,
    });

    try {
      await user.save();
    } catch (error) {
      return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'User registered' });
  },
};
