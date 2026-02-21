const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
  const repoPath = path.resolve(process.cwd(), ".repoGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitID);
    const files = await readdir(commitDir); // if any error occurs here it will be catched and printed

    const parenDir = path.resolve(repoPath, ".."); // get to the revert location: here in backend

    for (const file of files) {
      await copyFile(path.join(commitDir, file), path.join(parenDir, file));
    }

    console.log(`reverted to ${commitID}`);
  } catch (err) {
    console.error("Unable to revert: ", err);
  }
}

module.exports = { revertRepo };
