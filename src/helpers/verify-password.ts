import bcrypt from "bcrypt";

export async function verifyPassword(
  inputPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(inputPassword, hashedPassword);
}
