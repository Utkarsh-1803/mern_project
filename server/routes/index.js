const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  return res.json(400, {
    message: "Please request the correct routes!",
  });
});

router.use("/users", require("./user")); //routes to all users reuqest
router.use("/dummyusers", require("./dummyuser")); //routes to all dummyUsers reuqest

module.exports = router;
