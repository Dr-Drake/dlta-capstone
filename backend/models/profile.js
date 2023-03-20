import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String, required: true },
    projects: [
      {
        projectName: { type: String, required: true },
        youtube: { type: String, required: true },
        github: { type: String, required: true },
        description: { type: String, required: true },
        technologies: [String],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
