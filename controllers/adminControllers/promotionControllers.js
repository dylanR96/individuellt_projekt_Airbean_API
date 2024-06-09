import db from "../../db/database.js";
import getDateTime from "../../services/currentTime.js";

const addPromotion = async (req, res) => {
  const newPromotion = Array.isArray(req.body) ? req.body : [req.body];
  const allowedKeys = ["promotion", "desc", "price", "items"];
  const allowedSubKeys = ["title"];

  for (const promotion of newPromotion) {
    const promotionKeys = Object.keys(promotion);
    if (
      promotionKeys.length > 5 ||
      !promotionKeys.every((key) => allowedKeys.includes(key))
    ) {
      return res.status(400).json({
        error:
          "Each promotion must only contain promotion, desc, price, and items.",
      });
    }

    for (const productTitle of promotion.items) {
      const productTitleKeys = Object.keys(productTitle);
      if (
        productTitleKeys.length > 2 ||
        !productTitleKeys.every((key) => allowedSubKeys.includes(key))
      ) {
        return res.status(400).json({
          error: "Promotion items must only contain titles.",
        });
      }
      const menu = await db["menu"].findOne({ type: "menu" });
      let itemFound = false;
      for (let item of menu.data) {
        if (item.title === productTitle.title) {
          itemFound = true;
          break;
        }
      }

      if (!itemFound) {
        return res.status(400).json({
          error: "Items are not on the menu",
        });
      }

      const promotions = await db["promotions"].findOne({ type: "promotions" });
      let promotionFound = true;
      for (let product of promotions.data) {
        if (product.promotion === promotion.promotion) {
          promotionFound = false;
          break;
        }
      }

      if (!promotionFound) {
        return res.status(400).json({
          error: "Promotion is already active.",
        });
      }
    }
  }

  try {
    newPromotion[0].createdAt = getDateTime();
    await db["promotions"].update(
      { type: "promotions" },
      { $push: { data: newPromotion[0] } }
    );
    return res.status(201).json(`The promotion was added.`);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error adding the new promotion." });
  }
};

const removePromotion = async (req, res) => {
  const removePromotion = req.body;

  const allowedKeys = ["promotion"];

  const promotionKeys = Object.keys(removePromotion);
  if (
    promotionKeys.length > 1 ||
    !promotionKeys.every((key) => allowedKeys.includes(key))
  ) {
    return res.status(400).json({
      error: "To delete a promotion, you only add the name of the promotion",
    });
  }

  const { promotion } = removePromotion;
  if (!promotion) {
    return res.status(400).json({
      error: "You must add which promotion to remove",
    });
  }

  const promotions = await db["promotions"].findOne({ type: "promotions" });
  let promotionFound = false;
  for (let product of promotions.data) {
    if (product.promotion === promotion) {
      promotionFound = true;
      break;
    }
  }

  if (!promotionFound) {
    return res.status(400).json({
      error: "No promotion with that name was found.",
    });
  }

  try {
    const { promotion } = req.body;
    const promotionsData = await db["promotions"].findOne({
      type: "promotions",
    });
    const remainingPromotions = promotionsData.data.filter((product) => {
      console.log(product.promotion);
      return product.promotion != promotion;
    });
    const updateResult = await db["promotions"].update(
      { type: "promotions" },
      {
        $set: {
          data: remainingPromotions,
        },
      }
    );

    return res.status(200).json({ message: "The promotion has been deleted" });
  } catch (error) {
    return res.status(500).send({ error: "Error deleting the promotion" });
  }
};

export { addPromotion, removePromotion };
