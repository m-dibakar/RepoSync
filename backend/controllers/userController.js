const getAllUsers = (req, res) => {
  res.send("all users fetched");
};

const signup = (req, res) => {
  res.send("Signing in");
};

const login = (req, res) => {
  res.send("logging in");
};

const getUserProfile = (req, res) => {
  res.send("Profile fetched");
};

const updateUserProfile = (req, res) => {
  res.send("Profile updated");
};

const deleteUserProfile = (req, res) => {
  res.send("Profile Deleted");
};

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
