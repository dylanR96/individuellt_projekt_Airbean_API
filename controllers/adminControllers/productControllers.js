import db from "../../db/database.js";

const addProduct = async (req, res) => {
  // Checks if data is an array or just an object
  const newProduct = Array.isArray(req.body) ? req.body : [req.body];

  const allowedKeys = ["id", "title", "desc", "price"];

  // Error handling for input information from user
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
    //Inserts created data into database
    await db["menu"].update(
      { type: "menu" },
      { $push: { data: newProduct[0] } }
    );
    // Returns order ID for created order
    return res.status(201).json(`Product was added to the menu`);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error adding new product." });
  }
};

// To add a product to the order
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
    const productData = await db["menu"].findOne({ _id });
    console.log(id);
    console.log(productData);
    // await db["menu"].update(
    //   { type: "menu" },
    //   { $set: { data: updatedItems[0] } }
    // );
    return res.status(200).json({ message: "Product has been updated" });
  } catch (error) {
    return res.status(500).send({ error: "Error updating product" });
  }
};

const removeProduct = async (req, res) => {
  const orderId = req.params.orderId;
  const itemId = parseInt(req.query.itemId, 10);

  try {
    // Finds the order in the database
    const orderData = await db["order"].findOne({ orderId });

    // If order is not found in database
    if (!orderData) {
      return res.status(404).json({
        order: orderId,
        error: "Order not found, please enter a valid order id.",
      });
    }

    // Finds the item in the order
    const itemIndex = orderData.newOrder.findIndex(
      (item) => item.id === itemId
    );

    // If the product cant be found in the order
    if (itemIndex === -1) {
      return res.status(404).json({
        itemId,
        error: "Product not found, please enter a valid product id.",
      });
    }

    //  Removes the item from the order
    const removedData = orderData.newOrder.splice(itemIndex, 1)[0];

    // Creates a new order with the removed item but with the same order id
    await db["order"].update(
      { orderId: orderId },
      { $set: { newOrder: orderData.newOrder } }
    );

    // If every item gets removed from the order, the order will be deleted
    if (orderData.newOrder.length === 0) {
      await db["order"].remove({
        orderId,
      });
    }

    // Returns the removed item and a message. If an error occurs, a status 500 will be returned instead
    return res
      .status(200)
      .json({ removedData, message: "The product is removed" });
  } catch (error) {
    console.error(
      "An error occurred while trying to remove the product:",
      error
    );

    return res.status(500).json({ message: "Internal server error." });
  }
};

export { addProduct, changeProduct, removeProduct };
