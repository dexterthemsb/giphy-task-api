import * as jwt from "jsonwebtoken";

// generate a token on successful authentication
export const generateToken = (email: string, _id: string): string => {
  return jwt.sign({ email, _id }, process.env.JWT_TOKEN_PRIVATE_KEY!, {
    expiresIn: "30 days"
  });
};
