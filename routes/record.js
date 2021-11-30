const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    diary_dow: req.body.diary_dow,
    diary_date: req.body.diary_date,
    diary_hours: req.body.diary_hours,
    diary_cat: req.body.diary_cat,
    diary_task: req.body.diary_task,
    diary_tutor: req.body.diary_tutor,
    diary_feedback: req.body.diary_feedback,
    diary_feel: req.body.diary_feel,
    diary_note: req.body.diary_note,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        diary_dow: req.body.diary_dow,
        diary_date: req.body.diary_date,
        diary_hours: req.body.diary_hours,
        diary_cat: req.body.diary_cat,
        diary_task: req.body.diary_task,
        diary_tutor: req.body.diary_tutor,
        diary_feedback: req.body.diary_feedback,
        diary_feel: req.body.diary_feel,
        diary_note: req.body.diary_note,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated in records");
      response.json(res);
    });
});

recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted in records");
    response.status(obj);
  });
});

recordRoutes.route("/tool").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("tools")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/tool/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("tools")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

recordRoutes.route("/tool/add").post(function (req, response) {
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

recordRoutes.route("/update/tool/:id").post(function (req, response) {
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

recordRoutes.route("/tool/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("tools").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted in tools");
    response.status(obj);
  });
});

module.exports = recordRoutes;
