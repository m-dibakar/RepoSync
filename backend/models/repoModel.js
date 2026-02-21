const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  content: [
    {
      type: String,
    },
  ],
  visibility: {
    type: Boolean,
  },
  owner: {
    type: Schema.Types.ObjectId,
    reference: "User",
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      reference: "Issue",
    },
  ],
});

const Repository = mongoose.model("Repository", RepositorySchema);

export default Repository;
