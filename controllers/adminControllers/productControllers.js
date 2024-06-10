import db from "../../db/database.js";
import getDateTime from "../../services/currentTime.js";

const addProduct = async (req, res, next) => {
  const newProduct = req.newProduct;
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

const changeProduct = async (req, res, next) => {
  const updatedItems = req.newPromotion;
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

const removeProduct = async (req, res, next) => {
  const itemsToRemove = req.itemsToRemove;
  try {
    const { _id } = req.body;
    const productData = await db["menu"].findOne({ type: "menu" });
    const newMenu = productData.data.filter((product) => {
      return product._id != _id;
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
