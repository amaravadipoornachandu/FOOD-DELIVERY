import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";

// 🧠 Extract public_id from Cloudinary URL (used for deleting image)
const extractPublicId = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1]; // e.g. abc123.jpg
  return filename.split(".")[0]; // e.g. abc123
};

// ➕ Add Food Item
const addFood = async (req, res) => {
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.path, // Cloudinary image URL
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error" });
  }
};

// 📃 List All Food Items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    
    res.json({ success: true, data: foods });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error" });
  }
};

// ❌ Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    const publicId = extractPublicId(food.image); // no folder, just ID
    await cloudinary.uploader.destroy(publicId);

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
