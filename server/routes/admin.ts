import { Router } from "express";
import {
  addProduct,
  changeProduct,
  removeProduct,
} from "../controllers/adminControllers/productControllers.js";
import loginAdmin from "../controllers/adminControllers/loginAdmin.js";
import {
  addPromotion,
  removePromotion,
} from "../controllers/adminControllers/promotionControllers.js";
import authAdmin from "../middleware/authAdmin.js";
import {
  checkAddPromotion,
  checkRemovePromotion,
} from "../middleware/checkPromotion.js";
import {
  checkAddProducts,
  checkChangeProducts,
  checkRemoveProducts,
} from "../middleware/checkProducts.js";

const router = Router();

router.post("/addProduct", authAdmin, checkAddProducts, addProduct);

router.post("/login", loginAdmin);

router.post("/addPromotion", authAdmin, checkAddPromotion, addPromotion);

router.put("/changeProduct", authAdmin, checkChangeProducts, changeProduct);

router.delete("/removeProduct", authAdmin, checkRemoveProducts, removeProduct);

router.delete(
  "/removePromotion",
  authAdmin,
  checkRemovePromotion,

  removePromotion
);

export default router;
