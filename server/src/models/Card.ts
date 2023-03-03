import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 1000,
    required: true
  }
})

export const Card = mongoose.model("Card", CardSchema);