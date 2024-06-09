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

const router = Router();

router.post("/addProduct", authAdmin, addProduct);

router.post("/login", loginAdmin);

router.post("/addPromotion", addPromotion);

router.put("/changeProduct", authAdmin, changeProduct);

router.delete("/removeProduct", authAdmin, removeProduct);

router.delete("/removePromotion", authAdmin, removePromotion);

export default router;
