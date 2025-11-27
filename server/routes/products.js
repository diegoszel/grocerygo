const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { productSchema } = require("../validations/productValidation");

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const { q, category, inStock } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    if (inStock === "true") filter.inStock = true;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products (admin)
router.post("/", auth, admin, async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const product = await Product.create(value);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id (admin)
router.put("/:id", auth, admin, async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const product = await Product.findByIdAndUpdate(req.params.id, value, {
      new: true
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id (admin)
router.delete("/:id", auth, admin, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
