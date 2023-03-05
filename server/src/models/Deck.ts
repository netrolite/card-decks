import mongoose from "mongoose";

const DeckSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true,
  },
  createdBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Deck = mongoose.model("Deck", DeckSchema);
export default Deck;