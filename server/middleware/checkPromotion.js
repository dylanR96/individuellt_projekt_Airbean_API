import joi from "joi";
import db from "../db/database.js";

const checkAddPromotion = async (req, res, next) => {
  const addPromotionSchema = joi.object({
    promotion: joi
      .string()
      .pattern(/[a-zA-Z]/, "contains at least one letter")
      .required()
      .messages({
        "string.pattern.name":
          "Title must contain at least one letter and can include numbers and letters only.",
        "string.empty": "Title is required and cannot be empty.",
      }),
    desc: joi
      .string()
      .pattern(/[a-zA-Z]/, "contains at least one letter")
      .required()
      .messages({
        "string.pattern.name":
          "Desc must contain at least one letter and can include numbers and letters only.",
        "string.empty": "Desc is required and cannot be empty.",
      }),
    price: joi.number().required(),
    items: joi.required(),
  });

  const { error } = addPromotionSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newPromotion = Array.isArray(req.body) ? req.body : [req.body];
  const allowedSubKeys = ["title"];

  for (const promotion of newPromotion) {
    if (typeof promotion.price === "string") {
      return res.status(400).json({
        error: "Price must be a number.",
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
  req.newPromotion = newPromotion;
  next();
};

const checkRemovePromotion = async (req, res, next) => {
  const removePromotionSchema = joi.object({
    promotion: joi
      .string()
      .pattern(/[a-zA-Z]/, "contains at least one letter")
      .required()
      .messages({
        "string.pattern.name":
          "Promotion must contain at least one letter and can include numbers and letters only.",
        "string.empty": "Promotion is required and cannot be empty.",
      }),
  });

  const { error } = removePromotionSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const removePromotion = req.body;

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
  req.removePromotion = removePromotion;
  next();
};

export { checkAddPromotion, checkRemovePromotion };
