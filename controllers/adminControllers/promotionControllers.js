import db from "../../db/database.js";
import getDateTime from "../../services/currentTime.js";

const addPromotion = async (req, res) => {
  const newPromotion = Array.isArray(req.body) ? req.body : [req.body];
  const allowedKeys = ["id", "title", "desc", "price"];

  for (const promotion of newPromotion) {
    const promotionKeys = Object.keys(promotion);
    if (
      promotionKeys.length > 4 ||
      !promotionKeys.every((key) => allowedKeys.includes(key))
    ) {
      return res.status(400).json({
        error: "Each promotion must only contain id, title, desc, and price.",
      });
    }
    const menu = await db["menu"].findOne({ type: "menu" });
    let itemFound = false;
    for (let item of menu.data) {
      if (item.title === promotion.title) {
        itemFound = true;
        break;
      }
    }

    if (!itemFound) {
      return res.status(400).json({
        error: "Items are not on the menu",
      });
    }
  }

  try {
    newPromotion[0].createdAt = getDateTime();
    await db["promotions"].update(
      { type: "promotions" },
      { $push: { data: newPromotion[0] } }
    );
    return res.status(201).json(`Promotion was added to the menu`);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error adding new promotion." });
  }
};

const deletePromotion = async (req, res) => {
  const removePromotion = Array.isArray(req.body) ? req.body : [req.body];

  for (let item of removePromotion) {
    const { id, title, desc, price } = item;
    if (!id || !title || !desc || !price) {
      return res.status(400).json({
        error: "Each order must contain id, title, desc and price",
      });
    }

    const promotions = await db["promotions"].findOne({ type: "promotion" });
    let productFound = false;
    for (let product of promotions.data) {
      if (
        product._id === item.id &&
        product.title === item.title &&
        product.desc === item.desc &&
        product.price === item.price
      ) {
        productFound = true;
        break;
      }
    }

    if (!productFound) {
      return res.status(400).json({
        error: "Products must match active promotions.",
      });
    }
  }
  try {
    const { id } = req.body;
    const promotionsData = await db["promotions"].findOne({
      type: "promotion",
    });
    const remainingPromotions = promotionsData.data.filter((product) => {
      return product._id != id;
    });
    const updateResult = await db["promotions"].update(
      { type: "promotion" },
      {
        $set: {
          data: remainingPromotions,
        },
      }
    );

    return res.status(200).json({ message: "Promotion has been deleted" });
  } catch (error) {
    return res.status(500).send({ error: "Error deleting promotion" });
  }
};

export { addPromotion, deletePromotion };
