const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET /api/favorites
router.get("/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites || []);
  } catch (err) {
    next(err);
  }
});

// POST /api/favorites/:productId
router.post("/:productId", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const pid = req.params.productId;
    if (!user.favorites.map(id => id.toString()).includes(pid)) {
      user.favorites.push(pid);
    }
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/favorites/:productId
router.delete("/:productId", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const pid = req.params.productId;
    user.favorites = user.favorites.filter(
      (id) => id.toString() !== pid
    );
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
