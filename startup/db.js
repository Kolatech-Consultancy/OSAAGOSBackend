import mongoose from "mongoose";
import serverConfig from "../config/serverConfig.js"

const atlasUri = serverConfig.mongoDbUri;

export const connectDB =  async function(){
  const {connection: db} = await mongoose.connect(atlasUri)
  return db
}