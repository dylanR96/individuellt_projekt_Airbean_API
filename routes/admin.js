import { Router } from "express";
import {
  addProduct,
  changeProduct,
  removeProduct,
} from "../controllers/adminControllers/productControllers.js";
import loginAdmin from "../controllers/adminControllers/loginAdmin.js";
import {
  addPromotion,
  deletePromotion,
} from "../controllers/adminControllers/promotionControllers.js";
import authAdmin from "../middleware/authAdmin.js";

const router = Router();

router.post("/addProduct", addProduct);

router.post("/login", loginAdmin);

router.post("/addPromotion", authAdmin, addPromotion);

router.put("/changeProduct", changeProduct);

router.delete("/removeProduct", removeProduct);

router.delete("/deletePromotion", authAdmin, deletePromotion);

export default router;
