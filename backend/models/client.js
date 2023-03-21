import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
