import validator from "validator";

// regex
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

// validate email
const validateEmail = (email: string): boolean => validator.isEmail(email);

// check for empty email && password
export const isEmailPasswordEmpty = (email: string | undefined, password: string | undefined) => {
  // no email & no password
  if (!email && !password) return { success: false, msg: "Email & password cannot be empty" };

  // no email
  if (!email) return { success: false, msg: "Email cannot be empty" };

  // no password
  if (!password) return { success: false, msg: "Password cannot be empty" };

  return { success: true, msg: "" };
};

// validate password
const validatePassword = (password: string): boolean => passwordRegex.test(password);

// email & password validator
export const validateEmailPassword = (email: string | undefined, password: string | undefined) => {
  // check for empty email and password
  const checkForEmptyEmailPassword = isEmailPasswordEmpty(email, password);
  if (!checkForEmptyEmailPassword.success) return checkForEmptyEmailPassword;

  // invalid email & invalid password
  if (!validatePassword(password!) && !validateEmail(email!))
    return { success: false, msg: "Enter a valid email & password" };

  // invalid email
  if (!validateEmail(email!)) return { success: false, msg: "Enter a valid email" };

  // invalid password
  if (!validatePassword(password!)) return { success: false, msg: "Enter a valid password" };

  return { success: true, msg: "" };
};
