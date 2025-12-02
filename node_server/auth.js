import { betterAuth as configureBetterAuth } from "better-auth";

export const betterAuth = configureBetterAuth({
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  user: {
    additionalFields: {
      softwareBackground: { type: "string", required: false },
      hardwareBackground: { type: "string", required: false },
    },
  },
  authenticators: {
    emailAndPassword: {
      enabled: true,
    },
  },
});
