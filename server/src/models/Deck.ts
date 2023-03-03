import mongoose from "mongoose";

const DeckSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  }
})

const Deck = mongoose.model("Deck", DeckSchema);
export default Deck;