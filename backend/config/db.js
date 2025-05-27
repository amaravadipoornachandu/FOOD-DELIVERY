import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://amaravadipoornachandu:amaravadipoorncahandu@cluster0.aiys118.mongodb.net/food-del"
    )
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
