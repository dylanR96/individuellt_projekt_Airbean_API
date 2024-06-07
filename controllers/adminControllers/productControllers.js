import db from "../../db/database.js";
import getDateTime from "../../services/currentTime.js";

const addProduct = async (req, res) => {
  // Checks if data is an array or just an object
  const newProduct = Array.isArray(req.body) ? req.body : [req.body];
  const allowedKeys = ["id", "title", "desc", "price"];

  for (const products of newProduct) {
    const productKeys = Object.keys(products);
    if (
      productKeys.length > 4 ||
      !productKeys.every((key) => allowedKeys.includes(key))
    ) {
      return res.status(400).json({
        error: "Each order must only contain id, title, desc, and price.",
      });
    }
    const menu = await db["menu"].findOne({ type: "menu" });
    let itemFound = false;
    for (let item of menu.data) {
      if (item._id === products.id || item.title === products.title) {
        itemFound = true;
        break;
      }
    }

    if (itemFound) {
      return res.status(400).json({
        error: "Items already exist.",
      });
    }
  }

  try {
    newProduct[0].createdAt = getDateTime();
    await db["menu"].update(
      { type: "menu" },
      { $push: { data: newProduct[0] } }
    );
    return res.status(201).json(`Product was added to the menu`);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error adding new product." });
  }
};

const changeProduct = async (req, res) => {
  const updatedItems = Array.isArray(req.body) ? req.body : [req.body];

  for (let order of updatedItems) {
    const { id, title, desc, price } = order;
    if (!id || !title || !desc || !price) {
      return res.status(400).json({
        error: "Each order must contain id, title, desc and price",
      });
    }

    const menu = await db["menu"].findOne({ type: "menu" });
    let itemFound = false;
    for (let item of menu.data) {
      if (item._id === id) {
        itemFound = true;
        break;
      }
    }

    if (!itemFound) {
      return res.status(400).json({
        error: "Id must match menu id",
      });
    }
  }
  try {
    const { id, title, desc, price } = req.body;
    const productData = await db["menu"].findOne({ type: "menu" });

    const productIndex = productData.data.findIndex(
      (product) => product._id === id
    );
    const updateResult = await db["menu"].update(
      { type: "menu" },
      {
        $set: {
          [`data.${productIndex}.title`]: title,
          [`data.${productIndex}.desc`]: desc,
          [`data.${productIndex}.price`]: price,
          [`data.${productIndex}.modifiedAt`]: getDateTime(),
        },
      }
    );
    return res.status(200).json({ message: "Product has been updated" });
  } catch (error) {
    return res.status(500).send({ error: "Error updating product" });
  }
};

const removeProduct = async (req, res) => {
  const updatedItems = Array.isArray(req.body) ? req.body : [req.body];

  for (let order of updatedItems) {
    const { id, title, desc, price } = order;
    if (!id || !title || !desc || !price) {
      return res.status(400).json({
        error: "Each order must contain id, title, desc and price",
      });
    }

    const menu = await db["menu"].findOne({ type: "menu" });
    let itemFound = false;
    for (let item of menu.data) {
      if (
        item._id === order.id &&
        item.title === order.title &&
        item.desc === order.desc &&
        item.price === order.price
      ) {
        itemFound = true;
        break;
      }
    }

    if (!itemFound) {
      return res.status(400).json({
        error: "Items must match menu.",
      });
    }
  }
  try {
    const { id } = req.body;
    const productData = await db["menu"].findOne({ type: "menu" });
    const newArray = productData.data.filter((product) => {
      return product._id != id;
    });
    const updateResult = await db["menu"].update(
      { type: "menu" },
      {
        $set: {
          data: newArray,
        },
      }
    );

    return res.status(200).json({ message: "Product has been deleted" });
  } catch (error) {
    return res.status(500).send({ error: "Error deleting product" });
  }
};

export { addProduct, changeProduct, removeProduct };
