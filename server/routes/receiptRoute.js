const express = require("express");
const { 
  createReceipt,
  updateReceipt,
  deleteReceipt,
  getReceiptById,
  getAllReceipts,
} = require("../controllers/receiptController");
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/create", authMiddleWare, isAdmin, createReceipt);
router.put("/:id", authMiddleWare, isAdmin, updateReceipt);
router.delete("/:id", authMiddleWare, isAdmin, deleteReceipt);
router.get("/:id", getReceiptById);
router.get("/", getAllReceipts);

module.exports = router;