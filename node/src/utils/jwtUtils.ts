import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { MESSAGES } from "./constants.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(MESSAGES.ERROR.JWT_SECRET_UNDEFINED);
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
if (!JWT_EXPIRES_IN) {
  throw new Error(MESSAGES.ERROR.JWT_EXPIRES_IN_UNDEFINED);
}

export const generateToken = (user: { id: string; email: string }): string => {
  if (!user.id || !user.email) {
    throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return token;
  } catch (error: any) {
    throw new Error(MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
  }
};

export const verifyToken = (
  token: string
): { id: string; email: string } | null => {
  if (!token) {
    console.error(MESSAGES.ERROR.NO_TOKEN_PROVIDED);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };
    return decoded;
  } catch (error: any) {
    console.error(MESSAGES.ERROR.TOKEN_VERIFICATION_FAILED);
    return null;
  }
};
