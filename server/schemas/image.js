import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ImageSchema = Schema({
  name: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  img: { type: Buffer, required: true },
  adType: { type: String, enum: [ "leaderboard", "bigbox", "mobile-leaderboard", "wallpaper" ], required: true },
});

module.exports = mongoose.model("Image", ImageSchema);
