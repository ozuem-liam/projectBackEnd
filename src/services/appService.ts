import bcrypt from 'bcrypt';

export const hashPassword =  async (password: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

export const isAMatchPassword = async (plainPassword: string, hashPassword: string) => {
  return await bcrypt.compare(plainPassword, hashPassword);
}

