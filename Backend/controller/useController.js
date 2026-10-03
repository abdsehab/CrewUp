import { hashPassword } from "../utils/helpers.js";
import User from "../model/user.js";
import Organization from "../model/organization.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select(["-password", "-__v"]);
    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.role === "admin" && !user.id) {
      return res.status(200).json({
        username: user.username,
        role: "admin",
        displayName: "Platform Admin"
      });
    }

    const userInfo = await User.findById(user.id).select(["-__v"]);

    // For org users, also fetch their approval status from organizations collection
    if (userInfo && userInfo.role === "organization") {
      const org = await Organization.findOne({ userId: userInfo._id }).select("status name image email");
      const result = userInfo.toObject();
      result.orgStatus = org?.status || "Pending";
      result.orgId = org?._id || null;
      return res.status(200).json(result);
    }

    return res.status(200).json(userInfo);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const createUser = async (req, res) => {
  const { username, displayName, password, role, image } = req.body;

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    username,
    displayName,
    password: hashedPassword,
    role,
    image,
  });

  try {
    const otherUser = await User.findOne({ username }).select(["username"]);

    if (otherUser) {
      return res.status(400).json({ error: "Username already in use" });
    }
    await newUser.save();

    // If registering as an organization, create a Pending org document
    if (role === "organization") {
      await Organization.create({
        name: displayName,
        email: username,
        image: image || null,
        status: "Pending",
        verified: false,
        userId: newUser._id,
      });
    }

    return res.status(201).json({ message: "New user added successfully" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updatedUser = async (req, res) => {
  const { displayName, username, password } = req.body;
  const { id } = req.params;

  const hashedPassword = await hashPassword(password);

  try {
    const anotherUser = await User.findOne({ username }).select("_id").lean();

    if (anotherUser && anotherUser._id.toString() !== id) {
      return res.status(400).json({ error: "Username already in use" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { username, displayName, password: hashedPassword },
      {
        new: true,
      },
    ).select("-__v");

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    return res.status(200).json({ message: "All users deleted" });
  } catch (err) {
    return res.status(400).json(err);
  }
};
