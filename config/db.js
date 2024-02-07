import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL);
    console.log(`Connected to mongodb database`);
  } catch (err) {
    console.log(`Error occured ${err}`);
  }
};

export default ConnectDB;
