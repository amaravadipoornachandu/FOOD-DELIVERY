import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Item not added to cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item removed from cart" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error in removing from cart" });
  }
};

// Get cart data
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
