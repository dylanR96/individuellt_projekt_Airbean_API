import db from "../../db/database.js";
import getDateTime from "../../services/currentTime.js";

const addProduct = async (req, res) => {
  const newProduct = Array.isArray(req.body) ? req.body : [req.body];
  const allowedKeys = ["_id", "title", "desc", "price"];

  for (const item of newProduct) {
    const itemKeys = Object.keys(item);
    if (
      itemKeys.length > 4 ||
      !itemKeys.every((key) => allowedKeys.includes(key))
    ) {
      return res.status(400).json({
        error:
          "Each new product must only contain _id, title, desc, and price.",
      });
    }
    const menu = await db["menu"].findOne({ type: "menu" });
    let menuItemFound = false;
    for (let menuItem of menu.data) {
      if (menuItem._id === item.id || menuItem.title === item.title) {
        menuItemFound = true;
        break;
      }
    }

    if (menuItemFound) {
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
    return res.status(201).json(`The new product was added to the menu`);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error adding the new product." });
  }
};

const changeProduct = async (req, res) => {
  const updatedItems = Array.isArray(req.body) ? req.body : [req.body];

  for (let item of updatedItems) {
    const { _id, title, desc, price } = item;
    if (!_id || !title || !desc || !price) {
      return res.status(400).json({
        error:
          "Each update must contain the id, title, desc and price of the product",
      });
    }

    const menu = await db["menu"].findOne({ type: "menu" });
    let menuItemFound = false;
    for (let menuItem of menu.data) {
      if (menuItem._id === _id) {
        menuItemFound = true;
        break;
      }
    }

    if (!menuItemFound) {
      return res.status(400).json({
        error: "Id must match menu id",
      });
    }
  }
  try {
    const { _id, title, desc, price } = req.body;
    const productData = await db["menu"].findOne({ type: "menu" });

    const productIndex = productData.data.findIndex(
      (product) => product._id === _id
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
  const itemsToRemove = Array.isArray(req.body) ? req.body : [req.body];

  for (let item of updatedItems) {
    const { id, title, desc, price } = item;
    if (!id || !title || !desc || !price) {
      return res.status(400).json({
        error: "To remove a product you must add the id, title, desc and price",
      });
    }

    const menu = await db["menu"].findOne({ type: "menu" });
    let menuItemFound = false;
    for (let menuItem of menu.data) {
      if (
        menuItem._id === item.id &&
        menuItem.title === item.title &&
        menuItem.desc === item.desc &&
        menuItem.price === item.price
      ) {
        itemFound = true;
        break;
      }
    }

    if (!menuItemFound) {
      return res.status(400).json({
        error: "Items must match the menu.",
      });
    }
  }
  try {
    const { id } = req.body;
    const productData = await db["menu"].findOne({ type: "menu" });
    const newMenu = productData.data.filter((product) => {
      return product._id != id;
    });
    const updateResult = await db["menu"].update(
      { type: "menu" },
      {
        $set: {
          data: newMenu,
        },
      }
    );

    return res.status(200).json({ message: "The product has been deleted" });
  } catch (error) {
    return res.status(500).send({ error: "Error deleting the product" });
  }
};

export { addProduct, changeProduct, removeProduct };
