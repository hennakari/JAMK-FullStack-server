const express = require("express");
const toolRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

toolRoutes.route("/tool").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("tools")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

toolRoutes.route("/tool/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("tools")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

toolRoutes.route("/tool/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    tool_name: req.body.tool_name,
    tool_hours: req.body.tool_hours,
    tool_date: req.body.tool_date,
  };
  db_connect.collection("tools").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

toolRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      tool_name: req.body.tool_name,
      tool_hours: req.body.tool_hours,
      tool_date: req.body.tool_date,
    },
  };
  db_connect
    .collection("tools")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated in tools");
      response.json(res);
    });
});

toolRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("tools").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted in tools");
    response.status(obj);
  });
});

module.exports = toolRouteskokeillaan;