import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
  readFileUsers,
  saveFileUser,
  updateFileUser,
} from "../services/fileService.js";
import { User } from "../models/User.js";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../validations/userSchema.js";

export const signUpUser = async (req, res) => {
  const { error, value } = signUpSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  const users = await readFileUsers();

  const existingUser = users.find((user) => user.email === value.email);

  if (existingUser) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "User already exists",
      errors: ["A user with this email already exists"],
    });
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);

  const newUser = new User(
    uuidv4(),
    value.username,
    value.email,
    hashedPassword
  );

  await saveFileUser(newUser);

  return res.status(201).json({
    status: true,
    code: 201,
    message: "User registered successfully",
    data: {
      token: hashedPassword,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    },
  });
};

export const signInUser = async (req, res) => {
  const { error, value } = signInSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  const { email, password } = value;

  const users = await readFileUsers();

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({
      status: false,
      code: 400,
      errors: ["User not found with this Credentials"],
      message: "User not found with this Credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      status: false,
      code: 400,
      errors: ["Invalid credentials"],
      message: "Invalid credentials",
    });
  }

  return res.status(200).json({
    status: true,
    code: 200,
    message: "Sign in successful",
    data: {
      token: user.password,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    },
  });
};

export const forgotPassword = async (req, res) => {
  const { error, value } = forgotPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      code: 400,
      status: false,
      message: "Invalid email",
      errors: error.details.map((d) => d.message),
    });
  }

  const users = await readFileUsers();
  const user = users.find((u) => u.email === value.email);
  if (!user) {
    return res.status(404).json({
      code: 404,
      status: false,
      message: "User not found",
      errors: ["User not found with this email"],
    });
  }

  user.resetToken = uuidv4();
  user.updatedAt = new Date().toISOString();

  const userIndex = users.findIndex((u) => u.email === value.email);

  users[userIndex] = user;
  await updateFileUser(users);

  return res.json({
    status: true,
    code: 200,
    message: "Reset token generated. (In production, this would be emailed.)",
    data: { resetToken: user.resetToken },
  });
};

export const resetPassword = async (req, res) => {
  const { error, value } = resetPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Invalid data",
      errors: error.details.map((d) => d.message),
    });
  }

  const users = await readFileUsers();
  const user = users.find(
    (u) => u.email === value.email && u.resetToken === value.resetToken
  );

  if (!user) {
    return res.status(400).json({
      code: 400,
      status: false,
      message: "Invalid token or email",
      errors: ["Invalid token or email"],
    });
  }

  user.password = await bcrypt.hash(value.newPassword, 10);
  user.resetToken = null;
  await updateFileUser(users);

  return res.status(200).json({
    status: true,
    code: 200,
    data: {
      token: user.password,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    },
    message: "Password reset successful",
  });
};
