const createRepository = (req, res) => {
  res.send("Repo created");
};

const getAllRepositories = (req, res) => {
  res.send("all repos fetched");
};

const fetchRepositoryById = (req, res) => {
  res.send("Repository details fetched");
};

const fetchRepositoriesForCurrentUser = (req, res) => {
  res.send("Repositories for logged in user fetched");
};

const updateRepositoryById = (req, res) => {
  res.send("Repository updated");
};

const toggleVisibilityById = (req, res) => {
  res.send("Visibility toggled");
};

const deleteRepositoryById = (req, res) => {
  res.send("Repository deleted");
};

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
