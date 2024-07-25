import crypto from 'crypto';
import bcrypt from "bcrypt"
import {User,hashPassword} from "../models/user.js"
import jwt from 'jsonwebtoken'
import serverConfig from "../config/serverConfig.js"

import { BadRequestError, NotFoundError } from '../errors/index.js';


export async function create(data) {
  let user = await User.findOne({ email: data.email });
  if (user) throw new ConflictError('User already exist');
  const hashedPassword = await hashPassword(data.password);

  user = new User({
    email: data.email,
  password:hashedPassword
    
});

  return await user.save();
}
export const otherLogin = async (data) => {
	const user = await User.findOne({ email: data.email })
	if (!user) throw new BadRequestError('Invalid email or password')

	const isValidPassword = await bcrypt.compare(data.password, user.password)
	if (!isValidPassword) throw new BadRequestError('Invalid email or password')

	const {password, ...userWithoutPassword} = user.toObject()
	const token = generateAuthToken(userWithoutPassword)
	return { user: userWithoutPassword, accessToken: token }
}

export const generateAuthToken = (userWithoutPssword) => {
	const token = jwt.sign(userWithoutPssword, serverConfig.jwtSecret, { expiresIn: '1hr' });
	return token;
};
