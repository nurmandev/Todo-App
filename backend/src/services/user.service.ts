import { UserEntity } from "../entities";
import { AppDataSouce } from "../db";

// Define types for the input data
interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface FindUserInput {
  userId?: string;
  email?: string;
}

export const createUser = async (
  data: CreateUserInput
): Promise<UserEntity | null> => {
  const { name, email, password } = data;

  const userRepository = AppDataSouce.getRepository(UserEntity);

  // Check for an existing user with the same email
  const existingUser = await userRepository.findOne({
    where: { email },
  });
  if (existingUser) return null;

  // Create and save the new user
  const user = userRepository.create({ name, email, password });
  await userRepository.save(user);
  return user;
};

export const getOneUser = async (
  data: FindUserInput
): Promise<UserEntity | null> => {
  const userRepository = AppDataSouce.getRepository(UserEntity);

  // Find the user using a dynamic filter
  const findUser = await userRepository.findOne({ where: { ...data } });
  return findUser || null;
};
