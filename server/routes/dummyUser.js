const express = require("express");
const DummyUserController = require("../controllers/dummyUsers");
const router = express.Router();

//route for registering a new aptient with jwt auth
router.post("/create", DummyUserController.CreateDummyUser);

//route for fetching all dummyusers
router.get("/all_users", DummyUserController.AllDummyUsers);

// route for fetching searched dummyusers
router.get("/search", DummyUserController.SearchedDummyUsers);

//route for deleting dummyuser
router.get("/delete", DummyUserController.DeleteDummyUser);

//route for updating dummyuser
router.put("/update", DummyUserController.UpdateDummyUser);

module.exports = router;
