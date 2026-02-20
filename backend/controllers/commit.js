const fs = require("fs").promises;
const console = require("console");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
  // paths:
  const repoPath = path.resolve(process.cwd(), ".repoGit");
  const stagedPath = path.join(repoPath, "staged");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitID = uuidv4(); // ID of the commit
    const commitDir = path.join(commitPath, commitID);
    await fs.mkdir(commitDir, { recursive: true });

    const files = await fs.readdir(stagedPath); // reading files from staging area
    for (const file of files) {
      await fs.copyFile(
        // copying the files from staging area to commit directory
        path.join(stagedPath, file),
        path.join(commitDir, file),
      );
    }
    // creating a json file to log the commit details
    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }),
    );
    // printing success message
    console.log(`commit: ${commitID} is created with message: ${message}`);
  } catch (error) {
    console.error("Error committing files: ", error);
  }
}

module.exports = { commitRepo };
