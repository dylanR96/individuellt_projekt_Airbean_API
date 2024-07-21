import joi from "joi";
import db from "../db/database.js";

const checkAddProducts = async (req, res, next) => {
  const productSchema = joi.object({
    _id: joi.number().required(),
    title: joi
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
  });

  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newProduct = Array.isArray(req.body) ? req.body : [req.body];

  for (const item of newProduct) {
    if (typeof item._id === "string" || typeof item.price === "string") {
      return res.status(400).json({
        error: "Id and price must be numbers, not strings.",
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
  req.newProduct = newProduct;
  next();
};

const checkChangeProducts = async (req, res, next) => {
  const productSchema = joi.object({
    _id: joi.number().required(),
    title: joi
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
  });

  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedItems = Array.isArray(req.body) ? req.body : [req.body];

  for (let item of updatedItems) {
    if (typeof item._id === "string" || typeof item.price === "string") {
      return res.status(400).json({
        error: "Id and price must be numbers, not strings.",
      });
    }

    const menu = await db["menu"].findOne({ type: "menu" });
    let menuItemFound = false;
    for (let menuItem of menu.data) {
      if (menuItem._id === item._id) {
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
  req.updatedItems = updatedItems;
  next();
};

const checkRemoveProducts = async (req, res, next) => {
  const productSchema = joi.object({ _id: joi.number().required() });

  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const itemsToRemove = Array.isArray(req.body) ? req.body : [req.body];

  for (let item of itemsToRemove) {
    if (typeof item._id === "string") {
      return res.status(400).json({
        error: "Id must be a number, not a string.",
      });
    }

    const menu = await db["menu"].findOne({ type: "menu" });
    let menuItemFound = false;
    for (let menuItem of menu.data) {
      if (menuItem._id === item._id) {
        menuItemFound = true;
        break;
      }
    }

    if (!menuItemFound) {
      return res.status(400).json({
        error: "Item must match the menu.",
      });
    }
  }
  req.itemsToRemove = itemsToRemove;
  next();
};

export { checkAddProducts, checkChangeProducts, checkRemoveProducts };
