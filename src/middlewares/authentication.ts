import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

// token error handler
const handleJWTErrors = (err: Error) => {
  switch (err.name) {
    case "TokenExpiredError":
      return "Session expired. Login Again.";
    case "JsonWebTokenError":
      return "Invalid Session. Login Again.";
    case "NotBeforeError":
      return "Token not active. Login.";
    default:
      return "Something went wrong. Login Again.";
  }
};

// validation middleware
export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY!);

      if (decodedToken) {
        res.locals.decodedToken = decodedToken;
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({ msg: handleJWTErrors(err) });
    }
  } else res.status(404).json({ msg: "Token not found" });
};

// compare JWT token ID with request ID
// call this after validateJWT
export const compareTokenID = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.decodedToken && res.locals.decodedToken._id === req.params.userID) next();
  else res.status(401).json({ msg: "Unauthorised" });
};
