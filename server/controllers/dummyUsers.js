const DummyUser = require("../models/dummyUser"); //User model

//creates a new dummyUser
module.exports.CreateDummyUser = async function (req, res) {
  console.log("request", req);
  console.log("type of request", typeof req.body);
  try {
    let user = await DummyUser.create(req.body); //creating a new dummyuser
    return res.json(201, {
      message: "DummyUser created successfully!",
      success: "true",
    });
  } catch {
    //catching errors
    console.log("Internal server error!!");
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

//fetching all dummyUsers
module.exports.AllDummyUsers = async function (req, res) {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let dummyUsers = (await DummyUser.find({})).slice(startIndex, endIndex); //fetching all dummyusers

    if (dummyUsers) {
      return res.json(201, {
        message: "DummyUsers fetched successfully",
        data: dummyUsers,
      });
    } else {
      //if dummy user dosen't exist
      return res.json(401, {
        message: "DummyUsers dosen't exist in database",
      });
    }
  } catch {
    //checking for errors
    console.log("Internal server error!!");
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

//fetching searched dummyUsers
module.exports.SearchedDummyUsers = async function (req, res) {
  try {
    const queryText = req.query.text;

    let dummyUser = await DummyUser.find({ name: { $regex: queryText } });

    if (dummyUser) {
      return res.json(201, {
        message: "DummyUsers fetched successfully",
        data: dummyUser,
        success: true,
      });
    } else {
      //if dummy user dosen't exist
      return res.json(401, {
        message: "DummyUsers dosen't exist in database",
      });
    }
  } catch {
    //checking for errors
    console.log("Internal server error!!");
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.DeleteDummyUser = async function (req, res) {
  var id = req.query.id;

  DummyUser.deleteOne({ _id: id }, function (err) {
    if (err) {
      return res.json(401, {
        message: "DummyUsers dosen't exist in database",
        success: false,
      });
    }
    return res.json(201, {
      message: "DummyUser deleted successfully!",
      success: "true",
    });
  });
};

module.exports.UpdateDummyUser = async function (req, res) {
  console.log("Inside Update API", req.body);
  var id = req.query.id;

  try {
    DummyUser.updateOne(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          status: req.body.status,
        },
      },
      function (err) {
        if (err) {
          return res.json(401, {
            message: "User not updated",
            success: false,
          });
        }
        return res.json(201, {
          message: "User updated successfully!",
          success: "true",
        });
      }
    );
  } catch {
    //checking for errors
    console.log("Internal server error!!");
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
