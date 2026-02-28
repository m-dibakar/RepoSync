const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Repository name is required!" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid user ID!" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();
    res.status(201).json({
      message: "Repository created",
      repositoryID: result._id,
    });
  } catch (err) {
    console.error("Error during repository creation : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function getAllRepositories(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");
    res.json(repositories);
  } catch (err) {
    console.error("Error during fetching repositories : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function fetchRepositoryById(req, res) {
  const repoID = req.params.id;
  try {
    const repository = await Repository.findById(repoID)
      .populate("owner")
      .populate("issues");

    if (!repository) {
      return res.status(404).json({ message: "Repository not found!" });
    }

    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repository : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function fetchRepositoryByName(req, res) {
  const { name } = req.params;
  try {
    const repository = await Repository.findOne({ name })
      .populate("owner")
      .populate("issues");

    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repository : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function fetchRepositoriesForCurrentUser(req, res) {
  const userId = req.user;
  try {
    const repositories = await Repository.find({ owner: userId });
    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User repositories not found" });
    }
    res.json({ message: "Repositories found!" }, repositories);
  } catch (err) {
    console.error("Error during fetching user repositories : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }
    repository.content.push(content); // updating the new content
    repository.description = description; // updating the new description

    const updateRepository = repository.save();

    res.json({
      message: "Repository updated successfully",
      repository: updateRepository,
    });
  } catch (err) {
    console.error("Error during updating the repository : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function toggleVisibilityById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }
    repository.visibility = !repository.visibility; // toggling the boolean value

    const updateRepository = repository.save();

    res.json({
      message: "Repository visibility toggled successfully",
      repository: updateRepository,
    });
  } catch (err) {
    console.error("Error during toggling the visibility : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function deleteRepositoryById(req, res) {
  const { id } = req.params;
  try {
    const repository = await Repository.findByIdAndDelete(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }
    res.json({ message: "Repository deleted successfully!" });
  } catch (err) {
    console.error("Error during deleting the repository : ", err.message);
    res.status(500).send("Server error!");
  }
}

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
