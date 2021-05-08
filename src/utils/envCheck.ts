const environtmentVariables: string[] = [
  "MONGODB_PRODUCTION_URI",
  "MONGODB_DEVELOPMENT_URI",
  "JWT_TOKEN_PRIVATE_KEY",
  "GIPHY_API_KEY"
];

export const envCheck = () => {
  let missing: string[] = [];

  environtmentVariables.forEach(variable => {
    if (!process.env[variable]) missing.push(variable);
  });

  if (!!missing.length) {
    console.log("\nFollowing environment variables are missing:");

    missing.forEach(variable => console.log(`- ${variable}`));

    console.log("\nPlease add these variables in an env file.\n");

    process.kill(process.pid, "SIGTERM");
  }
};
