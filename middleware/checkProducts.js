import joi from "joi";

const checkAddProducts = (req, res, next) => {
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
  next();
};

const checkChangeProducts = (req, res, next) => {
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
  next();
};

const checkRemoveProducts = (req, res, next) => {
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
  next();
};

export { checkAddProducts, checkChangeProducts, checkRemoveProducts };
