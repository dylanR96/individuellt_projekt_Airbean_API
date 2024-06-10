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

router.post("/addProduct", checkAddProducts, authAdmin, addProduct);

router.post("/login", loginAdmin);

router.post("/addPromotion", checkAddPromotion, authAdmin, addPromotion);

router.put("/changeProduct", checkChangeProducts, authAdmin, changeProduct);

router.delete("/removeProduct", checkRemoveProducts, authAdmin, removeProduct);

router.delete(
  "/removePromotion",
  checkRemovePromotion,
  authAdmin,
  removePromotion
);

export default router;
