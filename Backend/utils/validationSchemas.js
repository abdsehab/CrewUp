import { body } from "express-validator";

export const validateUserUpdate = [
  // Validate firstName
  body("firstName").notEmpty().withMessage("First name is required"),

  // Validate lastName
  body("lastName").notEmpty().withMessage("Last name is required"),

  // Validate age
  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 18 })
    .withMessage("Age must be at least 18"),
];
