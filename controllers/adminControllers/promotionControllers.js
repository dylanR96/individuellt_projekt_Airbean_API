import db from "../../db/database.js";
import menu from "../../services/menu.js";

const addPromotion = async (req, res) => {
  // Creates unique ID for order
  const orderId = Math.floor(Math.random() * (999 - 100) + 100);
  // Makes order ID into a string
  const myOrderId = orderId.toString();

  // Checks if data is an array or just an object
  const newOrder = Array.isArray(req.body) ? req.body : [req.body];

  // Error handling for input information from user
  for (let order of newOrder) {
    const { id, title, desc, price } = order;
    if (id == null || title == null || desc == null || price == null) {
      return res.status(400).json({
        error: "Each order must contain id, title, desc, and price.",
      });
    }

    let itemFound = false;
    for (let item of menu) {
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
    // Adds estimated delivery to object
    const { userId } = req.query;
    if (userId === undefined) {
      console.log(`Order created as a guest.`);
    } else {
      // Checks if user ID exists in database
      const userExists = await db["users"].findOne({ _id: userId });

      if (!userExists) {
        return res.status(400).send("Incorrect user id");
      }
    }

    //Inserts created data into database

    await db["order"].insert({
      orderId: myOrderId,
      estDelivery: createDeliveryTime(),
      newOrder,
      userId: userId,
    });
    // Returns order ID for created order
    return res.status(201).json(`Your order id: ${myOrderId}`);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error adding new order." });
  }
};

const deletePromotion = async (req, res) => {
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

export { addPromotion, deletePromotion };
