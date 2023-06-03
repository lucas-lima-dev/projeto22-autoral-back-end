import { duplicatedEmailError, invalidCredentialsError } from "@/errors";
import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export async function validatePasswordOrFail(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
  }

export async function getUserOrFail(email: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

export async function createSession(user_id: number) {
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET);
    await sessionRepository.create({
      token,
      user_id,
    });
  
    return token;
  }