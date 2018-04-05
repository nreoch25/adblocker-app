import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  img: { type: Buffer, required: true },
  adType: { type: String, enum: [ "leaderboard", "bigbox" ], required: true },
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;
