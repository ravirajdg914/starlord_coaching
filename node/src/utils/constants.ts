export enum USER_ROLES {
  ADMIN = "admin",
  STUDENT = "student",
  TEACHER = "teacher",
}

export const MESSAGES = {
  ERROR: {
    JWT_SECRET_UNDEFINED: "JWT secret is not defined in environment variables",
    JWT_EXPIRES_IN_UNDEFINED:
      "JWT expiry time is not defined in environment variables",
    INVALID_CREDENTIALS: "Invalid credentials provided",
    NO_TOKEN_PROVIDED: "No token was provided",
    TOKEN_VERIFICATION_FAILED: "Token verification failed",
    INTERNAL_SERVER_ERROR:
      "Internal server error occurred during token processing",
  },
};
