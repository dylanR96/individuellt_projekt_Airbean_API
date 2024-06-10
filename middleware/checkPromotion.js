import joi from "joi";

const checkAddPromotion = (req, res, next) => {
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
  next();
};

const checkRemovePromotion = (req, res, next) => {
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
  next();
};

export { checkAddPromotion, checkRemovePromotion };
