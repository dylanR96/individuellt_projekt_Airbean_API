import db from "../../db/database.js";
import getDateTime from "../../services/currentTime.js";

const addPromotion = async (req, res, next) => {
  const newPromotion = req.newPromotion;
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

const removePromotion = async (req, res, next) => {
  const removePromotion = req.removePromotion;
  const { promotion } = removePromotion;
  try {
    const promotionsData = await db["promotions"].findOne({
      type: "promotions",
    });
    const remainingPromotions = promotionsData.data.filter((product) => {
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
