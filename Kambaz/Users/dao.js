import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDao() {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
  };

  // find all users
  const findAllUsers = () => model.find();

  // find user by id
  const findUserById = (userId) => model.findById(userId);

  // find user by username
  const findUserByUsername = (username) =>
    model.findOne({ username: username });

  // find user by credentials
  const findUserByCredentials = (username, password) =>
    model.findOne({ username: username, password: password });

  // find user by role
  const findUsersByRole = (role) => model.find({ role: role });

  // find users by partial name
  const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };

  // update user
  const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

  // delete user
  const deleteUser = (userId) => model.deleteOne({ _id: userId });

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    findUsersByRole,
    findUsersByPartialName,
    updateUser,
    deleteUser,
  };
}
