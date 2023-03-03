import mongoose from "mongoose";

export default function connectDB(uri: string) {
  return mongoose.connect(uri, {
    dbName: "card-decks"
  })
}
